import mongoose from "mongoose";
import Course from "../models/course.model";
import UserCourseProgress from "../models/userCourseProgress.model";
import Transaction from "../models/transaction.models";
import * as dotenv from "dotenv";

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

async function populateData() {
  await mongoose.connect(MONGODB_URI!);

  const courseId1 = new mongoose.Types.ObjectId();
  const courseId2 = new mongoose.Types.ObjectId();
  const userId1 = new mongoose.Types.ObjectId();
  const userId2 = new mongoose.Types.ObjectId();

  const courses = [
    {
      _id: courseId1,
      teacherId: new mongoose.Types.ObjectId(),
      courseTitle: "Introduction to Programming",
      courseDescription: "Learn the basics of programming.",
      category: "Programming",
      courseImage: "intro_programming.jpg",
      price: 49.99,
      level: "Beginner",
      status: "Published",
      sections: [
        {
          sectionTitle: "Getting Started",
          sectionDescription: "Introduction to the course.",
          chapters: [
            {
              type: "Text",
              chapterName: "Welcome",
              chapterContent: "Welcome to the course!",
              comments: [],
            },
            {
              type: "Video",
              chapterName: "Introduction Video",
              chapterContent: "Watch this video to get started.",
              video: "intro_video.mp4",
              comments: [],
            },
          ],
        },
      ],
      enrollments: [],
    },
    {
      _id: courseId2,
      teacherId: new mongoose.Types.ObjectId(),
      courseTitle: "Advanced JavaScript",
      courseDescription: "Deep dive into JavaScript.",
      category: "Programming",
      courseImage: "advanced_js.jpg",
      price: 99.99,
      level: "Advanced",
      status: "Draft",
      sections: [
        {
          sectionTitle: "Advanced Concepts",
          sectionDescription: "Learn advanced JavaScript concepts.",
          chapters: [
            {
              type: "Text",
              chapterName: "Closures",
              chapterContent: "Understanding closures in JavaScript.",
              comments: [],
            },
            {
              type: "Quiz",
              chapterName: "Closures Quiz",
              chapterContent: "Test your knowledge on closures.",
              comments: [],
            },
          ],
        },
      ],
      enrollments: [],
    },
  ];

  const userCourseProgresses = [
    {
      userId: userId1,
      courseId: courseId1,
      enrollmentDate: new Date().toISOString(),
      overallProgress: 50,
      sections: [
        {
          sectionId: new mongoose.Types.ObjectId(),
          chapterProgress: [
            {
              chapterId: new mongoose.Types.ObjectId(),
              isCompleted: true,
            },
            {
              chapterId: new mongoose.Types.ObjectId(),
              isCompleted: false,
            },
          ],
        },
      ],
      lastAccessedAt: new Date().toISOString(),
    },
    {
      userId: userId2,
      courseId: courseId2,
      enrollmentDate: new Date().toISOString(),
      overallProgress: 75,
      sections: [
        {
          sectionId: new mongoose.Types.ObjectId(),
          chapterProgress: [
            {
              chapterId: new mongoose.Types.ObjectId(),
              isCompleted: true,
            },
            {
              chapterId: new mongoose.Types.ObjectId(),
              isCompleted: true,
            },
          ],
        },
      ],
      lastAccessedAt: new Date().toISOString(),
    },
  ];

  const transactions = [
    {
      userId: userId1,
      dateTime: new Date().toISOString(),
      courseId: courseId1,
      paymentProvider: "stripe",
      amount: 49.99,
    },
    {
      userId: userId2,
      dateTime: new Date().toISOString(),
      courseId: courseId2,
      paymentProvider: "razorpay",
      amount: 99.99,
    },
  ];

  await Course.insertMany(courses);
  await UserCourseProgress.insertMany(userCourseProgresses);
  await Transaction.insertMany(transactions);

  console.log("Data populated successfully!");

  await mongoose.disconnect();
}

populateData().catch((err) => {
  console.error("Error populating data:", err);
  mongoose.disconnect();
});
