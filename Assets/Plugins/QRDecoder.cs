using UnityEngine;
using Antares.QRCode;

public class QRDecoder : MonoBehaviour {
//
//	// Use this for initialization
//	void Start () {
//	
//	}
//	
//	// Update is called once per frame
//	void Update () {
//	
//	}

	public static string GetQRCode( Texture2D tex )
	{
		return QRCodeProcessor.Decode( tex ).Text;
	}
}
