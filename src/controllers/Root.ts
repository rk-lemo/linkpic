import express from 'express';
import {IGeneralController} from '../types/GeneralController';

export default class Root implements IGeneralController{
   async handle(req: express.Request, res: express.Response): Promise<any> {
    return res.send('Hello World');
  }
}
