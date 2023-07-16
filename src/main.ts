import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import express, { Request, Response } from 'express';

// import { MailController } from './mail.controller';


  

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
    secret: 'my-secret',
    resave: false,
    saveUninitialized: false,
    cookie:{
      maxAge: 300000
     }
    }),
    );
    
  await app.listen(3000);
}
bootstrap();

// const app = express();
// const mailController = new MailController();

// app.use(express.json());

// app.post('/send-registration-email', (req: Request, res: Response) => {
//   mailController.sendRegistrationEmail(req, res);
// });

// app.listen(3000, () => {
//   console.log('Server is running on port 3000');
// });
