// import { User } from "../entities/User";
// import { MyContext } from "../types";
// import {
//   Mutation,
//   Arg,
//   Ctx,
// } from "type-graphql";
// import argon2 from "argon2";
// import { COOKIE_NAME } from "../constants";

// const validateRegister = () => {

//     // REGISTER USER
//     @Mutation(() => UserResponse)
//     async register(
//       @Arg("options") options: UsernamePasswordInput,
//       @Ctx() { em, req }: MyContext
//     ): Promise<UserResponse> {
//       // VALIDATE
//       if (options.email.includes("@")) {
//         return {
//           errors: [
//             {
//               field: "email",
//               message: "invalid email",
//             },
//           ],
//         };
//       }

//       if (options.username.length <= 2) {
//         return {
//           errors: [
//             {
//               field: "username",
//               message: "length must be greater than 2.",
//             },
//           ],
//         };
//       }

//       if (options.password.length <= 3) {
//         return {
//           errors: [
//             {
//               field: "password",
//               message: "length must be greater than 3.",
//             },
//           ],
//         };
//       }

//       const hashedPassword = await argon2.hash(options.password);
//       const user = em.create(User, {
//         username: options.username,
//         password: hashedPassword,
//         email: options.email,
//         created_at: new Date(),
//         updated_at: new Date(),
//       });
//       // ERROR HANDLING
//       try {
//         await em.persistAndFlush(user);
//       } catch (err) {
//         // duplicate username err
//         if (err.code === "23505") {
//           // || err.detail.includes("already exists")) {
//           return {
//             errors: [
//               {
//                 field: "username",
//                 message: "username already exists",
//               },
//             ],
//           };
//         }
//       }
//       // store userId session
//       // this will set a cookie on the user
//       // keep them logged in
//       req.session.userId = user.id; // we can store properties on the session object

//       return {
//         user,
//       };
//     };
//     }
//   }

// }
