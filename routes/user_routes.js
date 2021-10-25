const express = require("express");
const { users } = require("../prisma/connection");
const upload_avatar = require("../services/multer_services");
const user = express.Router();
const path = require("path");
const { hashPassword } = require("../services/hash_service");
const fs = require("fs");

//create user sekalian avatar
user.post("/user_create", upload_avatar.single("avatar"), async (req, res) => {
  try {
    const data = await req.body;
    const file = await req.file;

    //store to 2 table users and avatar
    const storeUser = await users.create({
      data: {
        username: data.username,
        password: hashPassword(data.password),
        avatar: {
          create: {
            filename: file.filename,
            image_path: path.join(
              __dirname,
              "../static/uploads/avatar/" + file.filename
            ),
          },
        },
      },
    });

    //check if any errors
    if (!storeUser) {
      res.json({
        success: false,
        msg: "error in insert data",
      });
      return;
    }

    res.json({
      success: true,
      query: storeUser,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
});

//read many
user.get("/user_read_all", async (req, res) => {
  try {
    const result = await users.findMany({
      include: {
        avatar: true,
      },
    });
    res.json({
      success: true,
      query: result,
    });
  } catch (error) {
    res.json({
      success: false,
      error: error.message,
    });
  }
});

//delete user dan avatar sekaligus
user.delete("/user_delete/:id", async (req, res) => {
  try {
    const { id } = await req.params; //string
    const deleteUser = await users.delete({
      where: { id: parseInt(id) },
      include: { avatar: true },
    });
    //check apakah berhasil delete
    if (!deleteUser) {
      res.json({
        success: false,
        msg: "gagal delete data",
      });
      return;
    }

    //delete data dari filesistem
    const deleteImageFromServer = await fs.unlinkSync(
      path.join(
        __dirname,
        `../static/uploads/avatar/${deleteUser.avatar.filename}`
      )
    );
    res.json({
      success: true,
      query: "sukses delete data",
    });
  } catch (error) {}
});

module.exports = user;
