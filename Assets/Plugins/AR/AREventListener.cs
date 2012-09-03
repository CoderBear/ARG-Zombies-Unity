using UnityEngine;
using System;
using System.Collections;
using System.Collections.Generic;


public class AREventListener : MonoBehaviour
{

	void OnEnable()
	{
		// Listen to all events for illustration purposes
		ARManager.videoDidStartEvent += videoDidStartEvent;
		ARManager.videoDidFinishEvent += videoDidFinishEvent;
	}


	void OnDisable()
	{
		// Remove all event handlers
		ARManager.videoDidStartEvent -= videoDidStartEvent;
		ARManager.videoDidFinishEvent -= videoDidFinishEvent;
	}



	void videoDidStartEvent()
	{
		Debug.Log( "videoDidStartEvent" );
	}


	void videoDidFinishEvent()
	{
		Debug.Log( "videoDidFinishEvent" );
	}


}


