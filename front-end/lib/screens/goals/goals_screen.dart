import 'package:fin_track/controllers/goals_controller.dart';
import 'package:fin_track/screens/goals/active_goals_screen.dart';
import 'package:fin_track/screens/goals/add_goal_screen.dart';
import 'package:get/get.dart';
import 'package:fin_track/screens/goals/reached_goals_screen.dart';
import 'package:flutter/material.dart';
import '../../utils/constants.dart';

class GoalsScreen extends StatelessWidget {
  static const String routeName = '/goalsScreen';
  const GoalsScreen({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {

    final GoalsController _goalsController = Get.put(GoalsController());

    return DefaultTabController(
      length: 2,
      child: Scaffold(
        floatingActionButton: FloatingActionButton(
          onPressed: () {
           Navigator.of(context).pushNamed(AddGoalScreen.routeName);
          },
          child: const Icon(Icons.add),
          backgroundColor: kBackColor,
        ),
        appBar: AppBar(
          title: const Text("Goals"),
          backgroundColor: kBackColor,
          leading: IconButton(
            onPressed: () {
              Navigator.of(context).pop();
            },
            icon: const Icon(Icons.arrow_back_ios),
          ),
          bottom: const TabBar(
            tabs: [
              Tab(text: "ACTIVE"),
              Tab(text: "REACHED"),
            ],
            indicatorColor: Colors.white,
          ),
        ),
        body: TabBarView(
          children: [
            ActiveGoalScreen(),
            ReachedGoalScreen(),
          ],
          physics: const BouncingScrollPhysics(),
        ),
      ),
    );
  }
}
