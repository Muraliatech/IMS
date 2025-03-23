import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { Request, Response } from "express"
import { PrismaClient, Role } from "@prisma/client"
import redisClient from "../redisClient"; // Redis client
import { Console } from "console";
const prisma = new PrismaClient();

const JWT_SECRECT = process.env.JWT_SECRET || "murali@222"
console.log(JWT_SECRECT)
export const register = async (req: Request, res: Response) => {
  const { username, email, password ,contact} = req.body;
  console.log(req.body)

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      res.status(403).json({
        message: "User already exists",
        status: 403
      })
      return;
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashpassword,
        phone:contact,
        role: 'CUSTOMER',
        isActive: true

      },
      select:{
        id:true,
        username:true,
        email:true,
        phone:true,
        role:true,
        isActive:true

      }
    });
    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRECT, { expiresIn: "5h" });
    res.status(201).json({
      message: "User created successfully",
      token,
      user
    })
    return;
  }
  catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Internal server error",
      status: 500
    })
  }


}



export const adminregister = async (req: Request, res: Response) => {
  const { username, email, password ,} = req.body;

  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      res.status(403).json({
        message: "Admin already exists",
        status: 403
      })
      return;
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashpassword,
        role: 'ADMIN'

      },
      select:{
        id:true,
        username:true,
        email:true,
        phone:true,
        role:true,
        isActive:true

      }
    });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRECT, { expiresIn: "5h" });
    res.status(200).json({
      message: "ADMIN created successfully",
      token,
      user
    })
    return;
  }
  catch (error) {
    console.log(error)
    res.status(500).json({
      message: "Internal server error",
      status: 500
    })
  }

}



export const supplierRegister = async (req: Request, res: Response) => {
  const { username,contact, email,location,password,role } = req.body;
  console.log(req.body)
  if (!username || !email || !password || !contact || !location) {
    res.status(400).json({
      message: "Please enter all fields",
      status: 400,
    });
    return;
  }

  try {
    const existingUser = await prisma.supplier.findFirst({ where: { email } });

    if (existingUser) {
      res.status(403).json({
        message: "User already exists",
        status: 403,
      });
      return;
    }

    const hashpassword = await bcrypt.hash(password, 10);
    const user = await prisma.supplier.create({
      data: {
        name: username,
        contact: contact,  // Correct usage: passing the actual contact value
        email,
        password: hashpassword,
        location,
        role,
      },
      select:{
        id:true,
        email:true,
        contact:true,
        role:true, 
      }
    });

    const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRECT, { expiresIn: "5h" });

    res.status(201).json({
      message: "Supplier created successfully",
      token,
      user,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      status: 500,
    });
  }
};


// export const cusomerRegister = async (req: Request, res: Response) => {
//   const { username,email, password,phone } = req.body;
  
//   if (!username || !email || !password || !phone) {
//     res.status(400).json({
//       message: "Please enter all fields",
//       status: 400,
//     });
//     return;
//   }

//   try {
//     const existingUser = await prisma.user.findFirst({ where: { email } });

//     if (existingUser) {
//       res.status(403).json({
//         message: "User already exists",
//         status: 403,
//       });
//       return;
//     }

//     const hashpassword = await bcrypt.hash(password, 10);
//     const user = await prisma.user.create({
//       data: {
//         username,
//         email,
//         password: hashpassword,
//         phone: phone,
//         role: "CUSTOMER",
//         isActive: true
//       },
//       select:{
//         id:true,
//         username:true,
//         email:true,
//         phone:true,
//         role:true,
//         isActive:true

//       }
//     });

//     const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRECT, { expiresIn: "5h" });

//     res.status(200).json({
//       message: "Supplier created successfully",
//       token,
//       user,
//     });
//     return;
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({
//       message: "Internal server error",
//       status: 500,
//     });
//   }
// };

export const login = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;
 
  try {
    if (!email || !password) {
      res.status(400).json({
        message: "Please enter both email and password",
        status: 400,
      });
      return; // Ensure the function stops execution
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (!existingUser) {
      res.status(404).json({
        message: "User not found",
        status: 404,
      });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, existingUser.password);
    if (!isValidPassword) {
      res.status(401).json({
        message: "Invalid password",
        status: 401,
      });
      return;
    }

    const token = jwt.sign({ id: existingUser.id, role: existingUser.role }, JWT_SECRECT, {
      expiresIn: "24h",
    });

    res.status(201).json({
      message: "User logged in successfully",
      token,
      status: 200,
      user: existingUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      status: 500,
    });
  }
};


export const adminLogin = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      res.status(400).json({
        message: "Please enter both email and password",
        status: 400,
      });
      return; // Ensure the function stops execution
    }

    const existingUser = await prisma.user.findFirst({
      where: { email, role: 'ADMIN' },
    });

    if (!existingUser) {
      res.status(404).json({
        message: "ADMIN not found",
        status: 404,
      });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, existingUser.password);
    if (!isValidPassword) {
      res.status(401).json({
        message: "Invalid password",
        status: 401,
      });
      return;
    }

    const token = jwt.sign({ id: existingUser.id, role: existingUser.role }, JWT_SECRECT, {
      expiresIn: "5h",
    });

    res.status(200).json({
      message: "User logged in successfully",
      token,
      status: 200,
      user: existingUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      status: 500,
    });
  }
};


export const loginSupplier = async (req: Request, res: Response): Promise<void> => {
  const { email, password ,role} = req.body;
  console.log(req.body)
  try {
    if (!email || !password) {
      res.status(400).json({
        message: "Please enter both email and password",
        status: 400,
      });
      return; // Ensure the function stops execution
    }

    const existingUser = await prisma.supplier.findFirst({where: { email, role: role }, });

    if (!existingUser) {
      res.status(404).json({
        message: "Supplier not found",
        status: 404,
      });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, existingUser.password);
    if (!isValidPassword) {
      res.status(401).json({
        message: "Invalid password",
        status: 401,
      });
      return;
    }

    const token = jwt.sign({ id: existingUser.id, role: existingUser.role }, JWT_SECRECT, {
      expiresIn: "5h",
    });

    res.status(201).json({
      message: "User logged in successfully",
      token,
      status: 200,
      user: existingUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      status: 500,
    });
  }
};




export const forgotPassword = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  if (!email) {
    res.status(400).json({
      message: "Email is required",
      status: 400,
    });
    return;
  }
  try {
    const user = await prisma.user.findUnique({ where: { email } })

    if (!user) {
      res.status(400).json({
        message: "User not found",
        status: 400,
      })
    }
    const hashpassword = await bcrypt.hash(password, 10);
    await prisma.user.update({
      where: { email: email },
      data: {
        password: hashpassword
      }
    })


    res.status(200).json({ message: "Password updated successfully", status: 200 });


  }
  catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server error",
      status: 500,
    });
  }
}




export const logout = (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  try {

    const decoded = jwt.decode(token) as { exp: number };

    if (decoded?.exp) {

      redisClient.setex(token, decoded.exp - Math.floor(Date.now() / 1000), "blacklisted");
    }


    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const profile = async (req: Request, res: Response) => {
  const { email } = req.params;
  try{
    const user = await prisma.user.findUnique({where:{email}});
    if(!user){
      res.status(404).json({message:"User not found"});
      return;
    }
    res.status(200).json(user);
  }catch(err){
    console.error(err);
    res.status(500).json({message: "Internal server error"});
  }
 
}

export const updateProfile = async (req: Request, res: Response) => {
  const { email } = req.params;
  const { username, password } = req.body;
  try{
    const user = await prisma.user.findUnique({where:{email}});
    if(!user){
      res.status(404).json({message:"User not found"});
      return;
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const updatedUser = await prisma.user.update({where:{email}, data:{username, password:hashpassword}});
    res.status(200).json(updatedUser);
    }catch(err){
      console.error(err);
      res.status(500).json({message: "Internal server error"});
      }
}
