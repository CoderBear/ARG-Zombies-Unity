#!/usr/bin/python

from UpdateXcode import *
import os, uuid, sys, types, re
import StringIO
import plistlib
import hashlib
import logging
import syslog


if __name__ == "__main__":
	testing = len( sys.argv ) == 1

	if not testing:
		if len( sys.argv ) != 4:  # the program name and our 3 arguments
			sys.exit( 'incorrect number of parameters' )

		# grab our arguments
		projectPath = sys.argv[1]
		unityProjectPath = sys.argv[2]
		pluginName = sys.argv[3]
	else: # fill in test values based on curdir
		rootPath = os.getcwd().replace( '/Assets/Editor', '' )
		projectPath = rootPath + '/Xcode'
		unityProjectPath = rootPath
		pluginName = os.path.split( rootPath )[1]

	syslog.openlog( 'Prime31' )
	syslog.syslog( syslog.LOG_ALERT, '--- About to kick off the Runner for ' + pluginName + ' ---' )
	syslog.syslog( syslog.LOG_ALERT, '--- Python version: %s ---' % ( sys.version ) )

	try:
		run = Runner( projectPath, unityProjectPath, pluginName, testing )
	except Exception, e:
		syslog.syslog( syslog.LOG_ALERT, 'runner failed with error: %s' % e )
	
	syslog.syslog( syslog.LOG_ALERT, '--- Finished ' + pluginName + ' ---' )
