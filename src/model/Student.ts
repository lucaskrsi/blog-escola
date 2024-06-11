import { UUID, randomUUID } from "crypto";
import { Uuid } from "./Uuid";
import { prisma } from "./../database/config/client";
import { student } from "../http/routes/StudentRoute";
import { hashSync } from "bcrypt";
import { User } from "./User";

export class Student {

    

    public async create(name: string, email: string, birthDate: string, password: string) {
        let user = await prisma.user.findFirst({ where: { email } })
        if (user) {
            throw new Error('User already exists');
        }

        user = await prisma.user.create({
            data: {
                name: name,
                email: email,
                password: hashSync(password, 10),
                Student: {
                    create: [
                        {
                            birthDate: birthDate,
                        }
                    ]
                }
            }
        });

        const student = await prisma.student.findFirst({
            where:
            {
                id: user.id,
            }
        })

        return student;
    }
}