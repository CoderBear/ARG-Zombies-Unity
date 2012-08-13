using UnityEngine;
using System;
using System.IO;
using System.Xml;
using System.Text;
using System.Globalization;
using System.Collections;
using System.Collections.Generic;


public class ValueObject
{
	public object val;
	
	public ValueObject( object aVal )
	{
		val = aVal;
	}
	
	public ValueObject()
	{
	
	}
};


public class PListEditor
{
	// LoadPlistFromFile(String, Hashtable) is the root public function for loading a plist file into memory.  The plist is loaded into the hashtable passed.  Return true/false for success/failure
	public static bool loadPlistFromFile( string xmlFile, Hashtable plist )
	{
	    // Unless plist has already been initiated, it can't be passed by reference, which it has to be
	    if( plist == null )
	    {
	    	Debug.LogError("Cannot pass null plist value by reference to LoadPlistFromFile.");
	    	return false;
	    }
	    
	    // If the file doesn't exist, return a false
	    if( !File.Exists( xmlFile ) )
	    {
	    	Debug.LogError("File doesn't exist: " + xmlFile);
	    	return false;
	    }
	    
	    // Load the file into an XML data object
	    var sr = new StreamReader(xmlFile);
	    var txt = sr.ReadToEnd();
	    sr.Close();
	    var xml = new XmlDocument();
	    xml.LoadXml( txt );
	    
	    // Find the root plist object.  If it doesn't exist or isn't a plist node, state so and return null.
	    var plistNode = xml.LastChild;
	    if( plistNode.Name != "plist" )
	    {
	    	Debug.LogError("This is not a plist file: " + xmlFile);
	    	return false;
	    }
	    
	    // Get the version number of this plist file.  This script was designed to work with version 1.0.  If this is an incorrect version, state so and return null
	    var plistVers = plistNode.Attributes["version"].Value;
	    var plistVersSupported = "1.0";
	    if( plistVers != plistVersSupported )
	    {
	    	Debug.LogError("This is an unsupported plist version: " + plistVers + ". Require version " + plistVersSupported);
	    	return false;
	    }
	    
	    // Get the root plist dict object.  This is the root object that contains all the data in the plist file.  This object will be the hashtable.
	    var dictNode = plistNode.FirstChild;
	    if( dictNode.Name != "dict" )
	    {
	    	Debug.LogError("Missing root dict from plist file: " + xmlFile);
	    	return false;
	    }
	    
	    // Using the root dict node, load the plist into a hashtable and return the result.
	    // If successful, this will return true, and the plist object will be populated with all the appropriate information.
	    return LoadDictFromPlistNode( dictNode, plist );
	}
	
	
	// SavePlistToFile(String, Hashtable) is the root public function for saving a hashtable to a plist file.  The hashtable is saved to the file location passed as a plist.  Return true/false for success/failure.
	public static bool savePlistToFile( string xmlFile, Hashtable plist )
	{
	    // If the hashtable is null, then there's apparently an issue; fail out.
	    if( plist == null )
	    {
	    	Debug.LogError("Passed a null plist hashtable to SavePlistToFile.");
	    	return false;
	    }
	    
	    // Create the base xml document that we will use to write the data
	    var xml = new XmlDocument();
	    
	    // Create the root XML declaration
	    // This, and the DOCTYPE, below, are standard parts of a XML property list file
	    var xmldecl = xml.CreateXmlDeclaration( "1.0", "UTF-8", null );
	    xml.PrependChild( xmldecl );
	    
	    // Create the DOCTYPE
	    var doctype = xml.CreateDocumentType( "plist", "-//Apple//DTD PLIST 1.0//EN", "http://www.apple.com/DTDs/PropertyList-1.0.dtd", null );
	    xml.AppendChild( doctype );
	    
	    // Create the root plist node, with a version number attribute.
	    // Every plist file has this as the root element.  We're using version 1.0 of the plist scheme
	    var plistNode = xml.CreateNode( XmlNodeType.Element, "plist", null );
	    var plistVers = xml.CreateAttribute( "version" );
	    //var plistVers = xml.CreateNode( XmlNodeType.Attribute, "version", null );
	    plistVers.Value = "1.0";
	    plistNode.Attributes.Append( plistVers );
	    xml.AppendChild( plistNode );
	    
	    // Now that we've created the base for the XML file, we can add all of our information to it.
	    // Pass the plist data and the root dict node to SaveDictToPlistNode, which will write the plist data to the dict node.
	    // This function will itterate through the hashtable hierarchy and call itself recursively for child hashtables.
	    if( !SaveDictToPlistNode( plistNode, plist ) )
	    {
	        // If for some reason we failed, post an error and return false.
	        Debug.LogError("Failed to save plist data to root dict node: " + plist);
	        return false;
	    }
	    else
	    { // We were successful
	        // Create a StreamWriter and write the XML file to disk.
	        // (do not append and UTF-8 are default, but we're defining it explicitly just in case)
	        var sw = new StreamWriter( xmlFile, false, System.Text.Encoding.UTF8 );
	        xml.Save( sw );
	        sw.Close();
	    }
	    
	    // We're done here.  If there were any failures, they would have returned false.
	    // Return true to indicate success.
	    return true;
	}
	
	
	// Prints out a hashtable (plist contents)
	public static void printHashtable( Hashtable plist )
	{
		Debug.Log( "------------- start Hashtable ----------- " );
        foreach( var i in plist.Keys )
        {
        	printElement( (string)i, plist[i] );
        }
        Debug.Log( "------------- end Hashtable ----------- " );
	}
	
	
	public static void printArrayList( ArrayList array )
	{
		Debug.Log( "------------- start ArrayList ----------- " );
		
		foreach( var i in array )
			printElement( null, i );
		
		Debug.Log( "------------- end ArrayList ----------- " );
	}
	
	
	private static void printElement( string key, object ele )
	{
		if( key != null )
			Debug.Log( "--- Key: " + key + " ---" );
			
    	if( ele.GetType() == typeof( string ) )
    	{
    		Debug.Log( "value: " + ele );
    	}
    	else if( ele.GetType() == typeof( ArrayList ) )
    	{
    		printArrayList( ele as ArrayList );
    	}
    	else if( ele.GetType() == typeof( Hashtable ) )
    	{
    		printHashtable( ele as Hashtable );
    	}
    	else if( ele.GetType() == typeof( int ) || ele.GetType() == typeof( float ) )
    	{
    		Debug.Log( "--- value: " + ele + " ---" );
    	}
    	else
    	{
    		Debug.Log( "------===== Got Unknown type: " + ele + " =====------" );
    	}
	}
	
	
	// LoadDictFromPlistNode(XmlNode, Hashtable) takes an XML node and loads it as a hashtable.  Return true/false for success/failure
	private static bool LoadDictFromPlistNode( XmlNode node, Hashtable dict )
	{
	    // If we were passed a null object, return false
	    if( node == null )
	    {
	    	Debug.LogError("Attempted to load a null plist dict node.");
	    	return false;
	    }
	    
	    // If we were passed a non dict node, then post an error stating so and return false
	    if( node.Name != "dict" )
	    {
	    	Debug.LogError("Attempted to load an dict from a non-array node type: " + node + ", " + node.Name);
	    	return false;
	    }
	    
	    // We could be passed an null hashtable.  If so, initialize it.
	    if( dict == null )
	    	dict = new Hashtable();
	    
	    // Identify how many child nodes there are in this dict element and itterate through them.
	    // A dict element will contain a series of key/value pairs.  As such, we're going through the child nodes in pairs.
	    var cnodeCount = node.ChildNodes.Count;
	    for (var i = 0; i+1 < cnodeCount; i = i+2)
	    {
	        // Select the key and value child nodes
	        var keynode = node.ChildNodes.Item(i);
	        var valuenode = node.ChildNodes.Item(i+1);
	        
	        // If this node isn't a 'key'
	        if (keynode.Name == "key")
	        {
	            // Establish our variables to hold the key and value.
	            var key = keynode.InnerText;
	            var value = new ValueObject();
	            
	            // Load the value node.
	            // If the value node loaded successfully, add the key/value pair to the dict hashtable.
	            if (LoadValueFromPlistNode(valuenode, value))
	            {
	                // This could be one of several different possible data types, including another dict.
	                // AddKeyValueToDict() handles this by replacing existing key values that overlap, and doing so recursively for dict values.
	                // If this not successful, post a message stating so and return false.
	                if (!AddKeyValueToDict(dict, key, value))
	                {
	                	Debug.LogError("Failed to add key value to dict when loading plist from dict");
	                	return false;
	                }
	            }
	            // If the value did not load correctly, post a message stating so and return false.
	            else
	            {
	            	Debug.LogError("Did not load plist value correctly for key in node: " + key + ", " + node);
	            	return false;
	            }
	        }
	        // Because the plist was formatted incorrectly, post a message stating so and return false.
	        else
	        {
	        	Debug.LogError("The plist being loaded may be corrupt.");
	        	return false;
	        }
	    }
	    
	    // If we got this far, the dict was loaded successfully.  Return true
	    return true;
	}
	
	
	// LoadValueFromPlistNode(XmlNode, Object) takes an XML node and loads its value into the passed value object.
	// The value for this node can be one of several different possible types.  Return true/false for success/failure
	private static bool LoadValueFromPlistNode( XmlNode node, ValueObject value )
	{
	    // If passed a null node, post an error stating so and return false
	    if( node == null ) { Debug.LogError("Attempted to load a null plist value node."); return false; }
	    
	    // Identify the data type for the value node and assign it accordingly
	    if      (node.Name == "string")   { value.val = node.InnerText; }
	    else if (node.Name == "integer")  { value.val = int.Parse(node.InnerText); }
	    else if (node.Name == "real")     { value.val = float.Parse(node.InnerText); }
	    else if (node.Name == "date")     { value.val = DateTime.Parse(node.InnerText, null, DateTimeStyles.None); } // Date objects are in ISO 8601 format
	    else if (node.Name == "data")     { value.val = node.InnerText; } // Data objects are just loaded as a string
	    else if (node.Name == "true")     { value.val = true; } // Boollean values are empty objects, simply identified with a name being "true" or "false"
	    else if (node.Name == "false")    { value.val = false; }
	    // The value can be an array or dict type.  In this case, we need to recursively call the appropriate loader functions for dict and arrays.
	    // These functions will in turn return a boolean value for their success, so we can just return that.
	    // The val value also has to be instantiated, since it's being passed by reference.
	    else if (node.Name == "dict")     { value.val = new Hashtable(); return LoadDictFromPlistNode(node, (Hashtable)value.val); }
	    else if (node.Name == "array")    { value.val = new ArrayList(); return LoadArrayFromPlistNode(node, (ArrayList)value.val); }
	    else                              { Debug.LogError("Attempted to load a value from a non value type node: " + node + ", " + node.Name); return false; }
	    
	    // If we made it this far, then we had success.  Return true.
	    return true;
	}
	
	
	// LoadArrayFromPlistNode(XmlNode, Array) takes an XML node and loads it as an Array.  A plist array is just a series of value objects without keys.
	private static bool LoadArrayFromPlistNode( XmlNode node , ArrayList array )
	{
	    // If we were passed a null node object, then post an error stating so and return false
	    if( node == null ) { Debug.LogError("Attempted to load a null plist array node."); return false; }
	    
	    // If we were passed a non array node, then post an error stating so and return false
	    if( node.Name != "array" ) { Debug.LogError("Attempted to load an array from a non-array node type: " + node + ", " + node.Name); return false; }
	    
	    // We can be passed an empty array object.  If so, initialize it
	    if( array == null ) { array = new ArrayList(); }
	    
	    // Itterate through the child nodes for this array object
	    var nodeCount = node.ChildNodes.Count;
	    for (var i = 0; i < nodeCount; i++)
	    {
	        // Establish variables to hold the child node of the array, and it's value
	        var cnode = node.ChildNodes.Item(i);
	        var element = new ValueObject();
	        // Attempt to load the value from the current array node.
	        // If successful, add it as an element of the array.  If not, post and error stating so and return false.
	        if (LoadValueFromPlistNode(cnode, element)) { array.Add(element.val); }
	        else { return false; }
	    }
	    
	    // If we made it through the array without errors, return true
	    return true;
	}


	// AddKeyValueToDict(Hashtable, String, Object) handles adding new or existing values to a hashtable.
	// A hashtable can already contain the key that we're trying to add.  If it's a regular value, we can just replace the existing one with the new one.
	// If trying to add a hashtable value to another hashtable that already has a hashtable for that key, then we need to recursively add new values.
	// This allows us to load two plists with overlapping values so that they will be combined into one big plist hashtable, and the new values will replace the old ones with the same keys
	private static bool AddKeyValueToDict( Hashtable dict, string key, ValueObject valueParam )
	{
	    // Make sure that we have values that we can work with.
	    if( dict == null || key == null || key == string.Empty || valueParam == null )
	    {
	    	Debug.LogError("Attempted to AddKeyValueToDict() with null objects.");
	    	return false;
	    }
	    
	    // If the hashtabel doesn't already contain the key, they we can just go ahead and add it.
	    if( !dict.ContainsKey(key) )
	    {
	    	dict.Add(key, valueParam.val);
	    	return true;
	    }
	    
	    // At this point, the dict contains already contains the key we're trying to add.
	    // If the value for this key is of a different type between the dict and the new value, then we have a type mismatch.
	    // Post an error stating so, but go ahead and overwrite the existing key value.
	    if( valueParam.val.GetType() != dict[key].GetType() )
	    {
	        Debug.LogWarning("Value type mismatch for overlapping key (will replace old value with new one): " + valueParam.val + ", " + dict[key] + ", " + key);
	        dict[key] = valueParam.val;
	    }
	    // If the value for this key is a hashtable, then we need to recursively add the key values of each hashtable.
	    else if( valueParam.val.GetType() == typeof( Hashtable ) )
	    {
	        // Iterate through the elements of the value's hashtable.
	        foreach( var element in ((Hashtable)valueParam.val).Keys )
	        {
	            // Recursively attempt to add/repalce the elements of the value hashtable to the dict's value hashtable.
	            // If this fails, post a message stating so and return false.
	            if( !AddKeyValueToDict( dict[key] as Hashtable, element as string, new ValueObject( ((Hashtable)valueParam.val)[element] ) ) )
	            {
	                Debug.LogError("Failed to add key value to dict: " + element + ", " + ((Hashtable)valueParam.val)[element] + ", " + dict[key]);
	                return false;
	            }
	        }
	    }
	    // If the value is an array, then there's really no way we can tell which elements to overwrite, because this is done based on the congruent keys.
	    // Thus, we'll just add the elements of the array to the existing array.
	    else if( valueParam.val.GetType() == typeof( ArrayList ) )
	    {
	        foreach( var element in valueParam.val as ArrayList )
	        {
	        	((ArrayList)dict[key]).Add( element );
	        }
	    }
	    // If the key value is not an array or a hashtable, then it's a primitive value that we can easily write over.
	    else { dict[key] = valueParam.val; }
	    
	    // If we've gotten this far, then we were successful.  Return true.
	    return true;
	}
	
	
	// SaveDictToPlistNode(XmlNode, Hashtable) takes the hashtable and stores it into the XML node.  Return true/false for success/failure.
	// If the hashtable contains more hashtables, this function may call itself recursively.
	private static bool SaveDictToPlistNode(XmlNode node, Hashtable dict )
	{
	    // If we were passed a null object, return false
	    if( node == null )
	    {
	    	Debug.LogError("Attempted to save a null plist dict node.");
	    	return false;
	    }
	    
	    var dictNode = node.OwnerDocument.CreateNode( XmlNodeType.Element, "dict", null );
	    node.AppendChild( dictNode );
	    
	    // We could be passed an null hashtable.  This isn't necessarily an error.
	    if( dict == null )
	    {
	    	Debug.LogWarning("Attemped to save a null dict: " + dict);
	    	return true;
	    }
	    
	    // Itterate through the keys in the hashtable
	    foreach( var key in dict.Keys )
	    {
	        // Since plists are key value pairs, save the key to the plist as a new XML element
	        var keyNode = node.OwnerDocument.CreateElement("key");
	        keyNode.InnerText = key as string;
	        dictNode.AppendChild(keyNode);
	        
	        // The name of the value element is based on the datatype of the value.  We need to serialize it accordingly.  Pass the XML node and the hash value to SaveValueToPlistNode to handle this.
	        if( !SaveValueToPlistNode( dictNode, dict[key] ) )
	        {
	            // If SaveValueToPlistNode() returns false, that means there was an error.  Return false to indicate this up the line.
	            Debug.LogError("Failed to save value to plist node: " + key);
	            return false;
	        }
	    }
	    
	    // If we got this far then all is well.  Return true to indicate success.
	    return true;
	}
	
	
	// SaveValueToPlistNode(XmlNode, Object) takes a value and saves it as a plist value in the XmlNode passed.
	// A plist value is an XML element with a name based on the data type, and an inner text of the actual value.
	private static bool SaveValueToPlistNode( XmlNode node, object value )
	{
	    // The node passed will be the parent node to the new value node.
	    XmlNode valNode;
	    
	    // Identify the data type for the value and serialize it accordingly
	    if      ( value.GetType() == typeof( string ) )     { valNode = node.OwnerDocument.CreateElement("string"); }
	    else if( value.GetType() == typeof( int ) )         { valNode = node.OwnerDocument.CreateElement("integer"); }
	    else if( value.GetType() == typeof( decimal ) )	{ valNode = node.OwnerDocument.CreateElement("real"); }
	    else if( value.GetType() == typeof( DateTime ) )
	    {
	        // Dates need to be stored in ISO 8601 format
	        valNode = node.OwnerDocument.CreateElement("date");
	        valNode.InnerText = ((DateTime)value).ToUniversalTime().ToString("o");
	        node.AppendChild(valNode);
	        return true;
	    }
	    else if( value.GetType() == typeof( bool ) )
	    {
	        // Boolean values are empty elements, simply being stored as an elemement with a name of true or false
	        if( (bool)value == true ) { valNode = node.OwnerDocument.CreateElement("true"); }
	        else               { valNode = node.OwnerDocument.CreateElement("false"); }
	        node.AppendChild( valNode );
	        return true;
	    }
	    // Hashtables and arrays require special functions to save their values in an itterative and recursive manner.
	    // The functions will return true/false to indicate success/failure, so pass those on.
	    else if( value.GetType() == typeof( Hashtable ) ) { return SaveDictToPlistNode( node, value as Hashtable ); }
	    else if( value.GetType() == typeof( ArrayList ) ) { return SaveArrayToPlistNode( node, value as ArrayList ); }
	    // Anything that doesn't fit the defined data types will just be stored as "data", which is effectively a string.
	    else
	    {
	    	valNode = node.OwnerDocument.CreateElement("data");
	    }
	    
	    // Some of the values (strings, numbers, data) basically get stored as a string.  The rest will store their values in their special format and return true for success.  If we made it this far, then the value in valNode must be stored as a string.
	    valNode.InnerText = value.ToString();
	    node.AppendChild(valNode);
	    
	    // We're done.  Return true for success.
	    return true;
	}

	
	// SaveArrayToPlistNode(XmlNode, Array) takes an arry and stores it as an XML plist array.  A plist array is just a series of value objects without keys.
	private static bool SaveArrayToPlistNode( XmlNode node, ArrayList array )
	{
	    // Create the value node as an "array" element.
	    var arrayNode = node.OwnerDocument.CreateElement("array");
	    node.AppendChild(arrayNode);
	    
	    // Each element in the array can be any data type.  Itterate through the array and send each element to SaveValueToPlistNode(), where it can be stored accordingly based on its data type.
	    foreach( var element in array )
	    {
	        // If SaveValueToPlistNode() returns false, then there was a problem.  Return false in that case.
	        if( !SaveValueToPlistNode( arrayNode, element ) )
	        	return false;
	    }
	    
	    // If we made it this far then all is well.  Return true for success.
	    return true;
	}
	
}