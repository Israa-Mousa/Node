import { Request, Response, NextFunction } from 'express';
import multer from 'multer';

import path from 'path';
import { CustomError } from '../shared/utils/exception';

const destDirectory = path.join(__dirname, '../../src/uploads');
console.log('destDirectory', destDirectory);
export const multerUpload = multer({
  storage: multer.diskStorage({
    destination: (_req, _file, cb) => {
      cb(null, destDirectory); // تحديد المكان الذي يتم فيه تخزين الصور
    },
    filename: (_req: any, file: any, cb: any) => {
      // إنشاء اسم فريد للملف باستخدام الوقت الحالي وبعض الأرقام العشوائية
      const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
      cb(null, uniqueName); // تحديد اسم الملف
    }
  }),
  limits: {
    fileSize: 1024 * 1024 * 5 // الحد الأقصى لحجم الملف هو 5MB
  },
  fileFilter: (req, file, cb) => {
    // التأكد من أن نوع الملف هو صورة
    if (file.mimetype.startsWith('image/')) {
      cb(null, true); // إذا كان النوع "image/*"
    } else {
      cb(new Error('The file type is not supported')); // إذا كان النوع غير مدعوم
    }
  }
});

export const uploadSingle = (fieldName: string) =>
  multerUpload.single(fieldName);



export const uploadMultiple = (fieldName: string, maxCount: number) =>
  multerUpload.array(fieldName, maxCount);