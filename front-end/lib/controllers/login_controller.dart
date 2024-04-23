import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:fin_track/utils/constants.dart';
import 'package:shared_preferences/shared_preferences.dart';
import '../main.dart';

class LoginController extends GetxController {
  late TextEditingController mobileNumberController = TextEditingController();

  Future sendOtp() async {
    var url = Uri.parse(baseURL + '/users/sendOTP');

    try {
      var response = await http.post(url,
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: jsonEncode({"user_mobile": mobileNumberController.text}));

      return response;
    } catch (e) {
      rootScaffoldMessengerKey.currentState!.showSnackBar(SnackBar(
        content: Text(e.toString()),
      ));
    }
  }

  Future verifyOTP(String otp) async {
    var url = Uri.parse(baseURL + '/users/verifyOTP');

    try {
      var response = await http.post(url,
          headers: <String, String>{
            'Content-Type': 'application/json; charset=UTF-8',
          },
          body: jsonEncode({
            "user_mobile": mobileNumberController.text.trim(),
            "otp": otp,
          }));
      return response;
    } catch (e) {
      rootScaffoldMessengerKey.currentState!.showSnackBar(SnackBar(
        content: Text(e.toString()),
      ));
    }
  }

  Future logoutMe() async {
    var url = Uri.parse(baseURL + '/users/logout');
    final prefs = await SharedPreferences.getInstance();
    String? token = prefs.getString("tokenOfLoggedInUser");

    try {
      var response = await http.post(
        url,
        headers: <String, String>{
          "Authorization": "Bearer $token",
          'Content-Type': 'application/json; charset=UTF-8',
        },
      );

      mobileNumberController.clear();
      return response;
    } catch (e) {
      rootScaffoldMessengerKey.currentState!.showSnackBar(SnackBar(
        content: Text(e.toString()),
      ));
    }
  }
}
