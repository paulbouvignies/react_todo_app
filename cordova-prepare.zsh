rm -r -f './cordova_app/www'
cp -r './build' './cordova_app/www'
cd './cordova_app'
cordova prepare