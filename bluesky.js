/**
* Bluesky Xposed Hook Script for React Native Networking
*
* This is a jshook script for the Bluesky app, built using Rhino and Xposed.
* It hooks into HTTP responses in the React Native NetworkingModule to log
* request and response data, and creates a cloned response body.
*
* GitHub: https://github.com/playdevv/bluesky-jshook
* License: MIT
* Author: playdevv
*/

XposedHelpers.findAndHookMethod(
    'com.facebook.react.modules.network.NetworkingModule$2',
    runtime.classLoader,
    "onResponse",
    "okhttp3.Call",
    "okhttp3.Response",
    XC_MethodReplacement({
        replaceHookedMethod: function (param) {
            var lines = ["\n"];
            var response = param.args[1];

            var body = XposedHelpers.getObjectField(response, "body");
            var request = XposedHelpers.getObjectField(response, "request");

            var url = request.url();
            var method = request.method();
            var headers = request.headers();

            lines.push(`METHOD:\n - ${method}\n`);
            lines.push(`URL:\n - ${url}\n`);
            lines.push(`HEADERS:\n${headers}\n`);

            if (method == "POST") {
                var progressrequestbody = request.body();
                var requestbody = XposedHelpers.getObjectField(progressrequestbody, "mRequestBody");
                var this_toRequestBody = XposedHelpers.getObjectField(requestbody, "$this_toRequestBody");

                var postdata;
                if (`${requestbody}`.includes("toRequestBody$1")) {
                    postdata = this_toRequestBody.utf8();
                } else {
                    var byteCount = XposedHelpers.getObjectField(requestbody, "$byteCount");
                    var offset = XposedHelpers.getObjectField(requestbody, "$offset");
                    postdata = new Packages.java.lang.String(this_toRequestBody, offset, byteCount, "UTF-8");
                }

                lines.push(`POSTDATA:\n - ${postdata}\n`);
            }

            var originalBody = body;
            var bodyBytes = originalBody.bytes();
            var bodyText = new java.lang.String(bodyBytes, "UTF-8");
            lines.push(`RESPONSE:\n - ${bodyText}\n`);

            var newBody = originalBody.create(bodyText, originalBody.contentType());
            var newResponse = response.newBuilder().body(newBody).build();
            param.args[1] = newResponse;

            lines.push("====================\n");
            console.log(lines.join(""));

            return XposedBridge.invokeOriginalMethod(param.method, param.thisObject, param.args);
        }
    })
);
