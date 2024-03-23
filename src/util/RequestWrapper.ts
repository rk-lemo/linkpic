import {IGeneralController} from '../types/GeneralController';
import express from 'express';

export function wrap(controller: IGeneralController){
    return (req: express.Request, res: express.Response) => controller.handle(req, res);
}
