package com.fittintest; // replace com.your-app-name with your app’s name

import android.app.Activity;
import android.content.Intent;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;
import java.util.Calendar;
import java.text.SimpleDateFormat;

import com.facebook.react.bridge.Promise;

public class TestModule extends ReactContextBaseJavaModule {
	TestModule(ReactApplicationContext context) {
		super(context);
	}

	@Override
	public String getName() {
		return "TestModule";
	}

	// Call Calendar instanse and dispatch current date to react-native component as
	// js Promise
	@ReactMethod
	public void getCurrentNativeDate(Promise promise) {
		final Calendar calendar;
		final SimpleDateFormat format;
		final String date;

		calendar = Calendar.getInstance();
		format = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		date = format.format(calendar.getTime());

		try {
			promise.resolve(date);
		} catch (Exception e) {
			promise.reject("Error: ", e);
		}
	}

	// Open native activity (Google Map)
	@ReactMethod
	public void showNativeMap(String coordinates) {
		Activity activity = getCurrentActivity();
		if (activity != null) {

			// Start native activity
			Intent intent = new Intent(activity, MapActivity.class);

			// Recive coordinates from rn to native Map Activity
	  	if (coordinates != null && !coordinates.isEmpty()) {
      	intent.putExtra("coordinates", coordinates);
      }

			activity.startActivity(intent);
		}
	}
}