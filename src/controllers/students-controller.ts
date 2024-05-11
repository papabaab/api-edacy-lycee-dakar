import { Student } from "./../models/student.model";
import { StudentService } from "../services/student.service";
import { Request, Response } from "express";
// const studentService = require('../services/user-service')

export class StudentController {
  private studentService: StudentService;
  constructor() {
    this.studentService = new StudentService();
  }

  async getAll(req: Request, res: Response) {
    const students: Student[] = await this.studentService.getAll();
    console.log("CONTROLLER: REQUEST VALUE --> ", req.params.courseId);
    console.log("CONTROLLER: all students in db ", students);
    res.json(students);
  }

  async getById(req: Request, res: Response) {
    const student: Student = (await this.studentService.getById(
      req.params.studentId
    )) as Student;
    console.log("CONTROLLER: get student by studentId ", student);
    res.json(student);
  }

  async create(req: Request, res: Response) {
    const { firstname, lastname, username }: Student = req.body as Student;
    const courseId = req.params.courseId;
    const newStudent: Student = { ...req.body, courseId: Number(courseId) };
    console.log("CONTROLLER: student to be created ", req.params, newStudent, firstname, lastname, username);
    try {
      if (await this.studentService.alreadyExists(username)) {
        res.json({ message: "Student already exists" }).status(400);
        return;
      } else if (
        firstname == "" ||
        lastname == "" ||
        username == "" ||
        firstname == null ||
        lastname == null ||
        username == null ||
        courseId == null ||
        firstname == undefined ||
        lastname == undefined ||
        username == undefined ||
        courseId == undefined
      ) {
        res
          .json({
            message: "CONTENT OR PARAMS MISSING",
            firstname: firstname,
            lastname: lastname,
            username: username,
          })
          .status(400);
        return;
      }
      const student: Student | undefined = await this.studentService.create(
        newStudent
      );
      res.json({ message: "Student created", student: student }).status(201);
    } catch (err) {
      res.json({ message: "ERROR" }).status(500);
    }
  }

  async update(req: Request, res: Response) {
    const studentId = req.params.studentId;
    const student = req.body;
    console.log("CONTROLLER: student to be updated ", studentId, student);
    try {
      const studentUpdated = await this.studentService.update(
        studentId,
        student
      );
      console.log("CONTROLLER: student updated: ", studentUpdated);
      res
        .json({ message: "Student updated", studentUpdated: studentUpdated })
        .status(201);
    } catch (err) {
      res.json({ message: "ERROR" }).status(500);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const studentId = req.params.studentId;
      await this.studentService.delete(studentId);
      res.json({ message: "Student deleted" });
    } catch (err) {
      res.json({ message: "ERROR" }).status(500);
    }
  }
}
