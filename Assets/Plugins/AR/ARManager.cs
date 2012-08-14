using UnityEngine;
using System;
using System.Collections;
using System.Collections.Generic;


public class ARManager : MonoBehaviour
{
	// 
	public static event Action videoDidStartEvent;

	// 
	public static event Action videoDidFinishEvent;


	void Awake()
	{
		// Set the GameObject name to the class name for easy access from Obj-C
		gameObject.name = this.GetType().ToString();
		DontDestroyOnLoad( this );
	}
	

	public void videoDidStart( string empty )
	{
		if( videoDidStartEvent != null )
			videoDidStartEvent();
	}


	public void videoDidFinish( string empty )
	{
		if( videoDidFinishEvent != null )
			videoDidFinishEvent();
	}


}

