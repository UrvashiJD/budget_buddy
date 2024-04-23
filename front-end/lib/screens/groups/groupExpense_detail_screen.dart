import 'dart:typed_data';
import 'dart:io';
import 'package:fin_track/models/group_expense.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:path_provider/path_provider.dart';
import 'package:share_plus/share_plus.dart';
import '../../controllers/profile_controller.dart';
import '../../models/user.dart';
import '../../utils/constants.dart';
import 'package:screenshot/screenshot.dart';

class GroupExpenseDetailScreen extends StatefulWidget {
  static const String routeName = "/groupExpenseDetailScreen";
  final GroupExpense ge;
  final List<User> members;
  final double amount;
  const GroupExpenseDetailScreen(
      {Key? key, required this.ge, required this.members, required this.amount})
      : super(key: key);

  @override
  State<GroupExpenseDetailScreen> createState() =>
      _GroupExpenseDetailScreenState();
}

class _GroupExpenseDetailScreenState extends State<GroupExpenseDetailScreen> {
  final ProfileController _profileController = Get.put(ProfileController());
  String settlementMsg = "";

  //Create an instance of ScreenshotController
  ScreenshotController screenshotController = ScreenshotController();
  List<User> finalMembers = [];
  List<double> finalAmounts = [];

  @override
  void initState() {
    for (int i = 0; i < widget.ge.settlements.length; i++) {
      if (widget.ge.settlements[i].who ==
          _profileController.user.value.userID) {
        settlementMsg = "You'll Pay In Total";
        finalMembers.add(widget.members.where((element) => element.userID==widget.ge.settlements[i].whom).first);
        finalAmounts.add(widget.ge.settlements[i].amount);
      } else if (widget.ge.settlements[i].whom ==
          _profileController.user.value.userID) {
        settlementMsg = "You'll Get In Total";
        finalMembers.add(widget.members.where((element) => element.userID==widget.ge.settlements[i].who).first);
        finalAmounts.add(widget.ge.settlements[i].amount);
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        elevation: 0.0,
        backgroundColor: Colors.grey.shade200,
        title: const Text(
          "Details",
          style: TextStyle(
            color: Colors.black,
          ),
        ),
        actions: [
          IconButton(
            onPressed: () async {
              await screenshotController.capture().then((Uint8List? image) async {
                if (image != null) {
                  final directory = await getApplicationDocumentsDirectory();
                  final imagePath = await File('${directory.path}/image.png').create();
                  await imagePath.writeAsBytes(image);

                  await Share.shareFiles([imagePath.path]);
                }
              });
            },
            icon: const Icon(
              Icons.share,
              color: Colors.black,
            ),
          ),
        ],
        leading: IconButton(
          icon: const Icon(
            Icons.arrow_back_ios,
            color: Colors.black,
          ),
          onPressed: () {
            Navigator.of(context).pop();
          },
        ),
      ),
      body: Screenshot(
        controller: screenshotController,
        child: RawScrollbar(
          thumbColor: Colors.grey,
          child: Container(
            color: Colors.grey.shade200,
            width: double.infinity,
            height: double.infinity,
            padding: const EdgeInsets.all(16.0),
            child: ListView(
              physics: const BouncingScrollPhysics(),
              children: [
                Align(
                  alignment: Alignment.center,
                  child: Text(
                    "₹ ${widget.ge.totalExpense}",
                    style: const TextStyle(
                      color: Colors.black,
                      fontWeight: FontWeight.bold,
                      fontSize: 36.0,
                    ),
                  ),
                ),
                const SizedBox(
                  height: 8.0,
                ),
                Align(
                  alignment: Alignment.center,
                  child: Text(
                    widget.ge.expenseDesc,
                    style: const TextStyle(
                      color: Colors.black54,
                      fontSize: 16.0,
                    ),
                  ),
                ),
                const SizedBox(
                  height: 16.0,
                ),
                Align(
                  child: Text(
                    "Created on ${widget.ge.day} ${allMonths[widget.ge.month - 1]}",
                    style: const TextStyle(
                      color: Colors.grey,
                      fontSize: 13.0,
                    ),
                  ),
                  alignment: Alignment.centerLeft,
                ),
                const SizedBox(
                  height: 16.0,
                ),
                Container(
                  width: double.infinity,
                  alignment: Alignment.centerLeft,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(12.0),
                    color: Colors.white,
                  ),
                  child: Container(
                    child: Column(
                      children: [
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: [
                              Text(
                                settlementMsg,
                                style: const TextStyle(
                                  color: Colors.black,
                                  fontWeight: FontWeight.w500,
                                  fontSize: 12.0,
                                ),
                              ),
                              Text(
                                "₹ ${widget.amount}",
                                style: TextStyle(
                                  color: settlementMsg == "You'll Pay In Total"
                                      ? kErrorColor
                                      : kSuccessColor,
                                  fontWeight: FontWeight.bold,
                                  fontSize: 13.0,
                                ),
                              ),
                            ],
                          ),
                        ),
                        Container(
                          decoration: const BoxDecoration(
                            color: Colors.white,
                          ),
                          child: ListView.builder(
                            shrinkWrap: true,
                            physics: const BouncingScrollPhysics(),
                            itemBuilder: (context, index) {
                               User ? u = finalMembers[index];
                              return Padding(
                                padding:
                                    const EdgeInsets.symmetric(horizontal: 8.0),
                                child: Row(
                                  children: [
                                    Text(
                                      "Ｌ",
                                      style: TextStyle(
                                        color: Colors.grey.shade300,
                                        fontWeight: FontWeight.w600,
                                        fontSize: 25.0,
                                      ),
                                    ),
                                    Expanded(
                                      flex: 2,
                                      child: ListTile(
                                        dense: true,
                                        leading: CircleAvatar(
                                          radius: 14.0,
                                          backgroundImage: AssetImage(
                                            "assets/images/avatars/${u.profilePic}",
                                          ),
                                        ),
                                        title: Text(
                                          u.userName,
                                          style: TextStyle(
                                            color: Colors.grey.shade700,
                                            fontSize: 13,
                                          ),
                                        ),
                                        trailing: Text(
                                          "₹ ${finalAmounts[index]}",
                                          style: TextStyle(
                                            color: settlementMsg ==
                                                    "You'll Pay In Total"
                                                ? kErrorColor
                                                : kSuccessColor,
                                            fontWeight: FontWeight.bold,
                                            fontSize: 13.0,
                                          ),
                                        ),
                                        contentPadding:
                                            const EdgeInsets.all(0.0),
                                        horizontalTitleGap: 5.0,
                                      ),
                                    ),
                                  ],
                                ),
                              );
                            },
                            itemCount: finalMembers.length,
                          ),
                        ),
                      ],
                    ),
                    decoration: BoxDecoration(
                      color: kBackColor.withOpacity(0.1),
                      borderRadius: const BorderRadius.only(
                        topLeft: Radius.circular(12.0),
                        topRight: Radius.circular(12.0),
                      ),
                    ),
                  ),
                ),
                const Padding(
                  padding: EdgeInsets.symmetric(vertical: 12.0),
                  child: Align(
                    child: Text(
                      "Split Details",
                      textAlign: TextAlign.left,
                      style: TextStyle(
                        fontSize: 12.0,
                        color: Colors.black45,
                      ),
                    ),
                    alignment: Alignment.centerLeft,
                  ),
                ),
                Container(
                  width: double.infinity,
                  alignment: Alignment.centerLeft,
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(12.0),
                    color: Colors.white,
                  ),
                  child: Container(
                    child: Column(
                      children: [
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: const [
                              Text(
                                "Paid By",
                                style: TextStyle(
                                  color: Colors.black,
                                  fontWeight: FontWeight.w500,
                                  fontSize: 12.0,
                                ),
                              ),
                            ],
                          ),
                        ),
                        Container(
                          decoration: const BoxDecoration(
                            color: Colors.white,
                          ),
                          child: ListView.builder(
                            shrinkWrap: true,
                            physics: const BouncingScrollPhysics(),
                            itemBuilder: (context, index) {
                              PaidBy pb = widget.ge.paidBys[index];
                              User? u = widget.members.firstWhere(
                                  (element) => element.userID == pb.who);
                              return Padding(
                                padding:
                                    const EdgeInsets.symmetric(horizontal: 8.0),
                                child: ListTile(
                                  dense: true,
                                  leading: CircleAvatar(
                                    radius: 14.0,
                                    backgroundImage: AssetImage(
                                      "assets/images/avatars/${u.profilePic}",
                                    ),
                                  ),
                                  title: u.userID ==
                                          _profileController.user.value.userID
                                      ? Text(
                                          "You",
                                          style: TextStyle(
                                            color: Colors.grey.shade700,
                                            fontSize: 13.0,
                                          ),
                                        )
                                      : Text(
                                          u.userName,
                                          style: TextStyle(
                                            color: Colors.grey.shade700,
                                            fontSize: 13.0,
                                          ),
                                        ),
                                  trailing: Text(
                                    "₹ ${pb.amount}",
                                    style: const TextStyle(
                                      color: Colors.black,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 13.0,
                                    ),
                                  ),
                                  horizontalTitleGap: 5.0,
                                ),
                              );
                            },
                            itemCount: widget.ge.paidBys.length,
                          ),
                        ),
                      ],
                    ),
                    decoration: BoxDecoration(
                      color: kBackColor.withOpacity(0.1),
                      borderRadius: const BorderRadius.only(
                        topLeft: Radius.circular(12.0),
                        topRight: Radius.circular(12.0),
                      ),
                    ),
                  ),
                ),
                Container(
                  width: double.infinity,
                  alignment: Alignment.centerLeft,
                  decoration: const BoxDecoration(
                    color: Colors.white,
                  ),
                  child: Container(
                    child: Column(
                      children: [
                        Padding(
                          padding: const EdgeInsets.all(8.0),
                          child: Row(
                            mainAxisAlignment: MainAxisAlignment.spaceBetween,
                            children: const [
                              Text(
                                "Shared With",
                                style: TextStyle(
                                  color: Colors.black,
                                  fontWeight: FontWeight.w500,
                                  fontSize: 12.0,
                                ),
                              ),
                            ],
                          ),
                        ),
                        Container(
                          decoration: const BoxDecoration(
                            color: Colors.white,
                          ),
                          child: ListView.builder(
                            shrinkWrap: true,
                            physics: const BouncingScrollPhysics(),
                            itemBuilder: (context, index) {
                              User? u = widget.members[index];
                              return Padding(
                                padding:
                                    const EdgeInsets.symmetric(horizontal: 8.0),
                                child: ListTile(
                                  dense: true,
                                  leading: CircleAvatar(
                                    radius: 14.0,
                                    backgroundImage: AssetImage(
                                      "assets/images/avatars/${u.profilePic}",
                                    ),
                                  ),
                                  title: u.userID ==
                                          _profileController.user.value.userID
                                      ? Text(
                                          "You",
                                          style: TextStyle(
                                            color: Colors.grey.shade700,
                                            fontSize: 13.0,
                                          ),
                                        )
                                      : Text(
                                          u.userName,
                                          style: TextStyle(
                                            color: Colors.grey.shade700,
                                            fontSize: 13.0,
                                          ),
                                        ),
                                  trailing: Text(
                                    "₹ ${widget.ge.splitAmount}",
                                    style: const TextStyle(
                                      color: Colors.black,
                                      fontWeight: FontWeight.bold,
                                      fontSize: 13.0,
                                    ),
                                  ),
                                  horizontalTitleGap: 5.0,
                                ),
                              );
                            },
                            itemCount: widget.members.length,
                          ),
                        ),
                      ],
                    ),
                    decoration: BoxDecoration(
                      color: kBackColor.withOpacity(0.1),
                    ),
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
