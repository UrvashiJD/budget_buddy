import 'package:fin_track/screens/login/onboarding_screen.dart';
import 'package:fin_track/screens/login/splash_screen.dart';
import 'package:fin_track/services/notification_service.dart';
import 'package:fin_track/utils/constants.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'routers.dart';

bool isVisited = false;
final GlobalKey<ScaffoldMessengerState> rootScaffoldMessengerKey = GlobalKey<ScaffoldMessengerState>();

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  //initialize notification service
  await NotificationService().init();
  //app can can only be in portrait mode
  SystemChrome.setPreferredOrientations(
      [DeviceOrientation.portraitUp, DeviceOrientation.portraitDown]);
  final prefs = await SharedPreferences.getInstance();
  isVisited = prefs.getBool('isOnBoardingVisited') ?? false;
  var i = prefs.getInt('selectedColorIndex') ?? 0;
  kBackColor = colors[i];
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GetMaterialApp(
      title: 'FinTrack App',
      scaffoldMessengerKey: rootScaffoldMessengerKey,
      debugShowCheckedModeBanner: false,
      onGenerateRoute: (settings) => generateRoute(settings),
      theme: ThemeData(
        primarySwatch: Colors.blue,
        fontFamily: "CircularStd",
      ),
      home: isVisited ? const SplashScreen() : const OnBoardingScreen(),
     // home: Time(),
    );
  }
}
