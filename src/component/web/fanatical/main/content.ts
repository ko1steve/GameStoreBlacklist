import './style.css';
import { Container } from 'typescript-ioc';
import { ComponentController } from './../../../../core/componentController';
import { FanaticalMainConfig } from './config';
import { FanaticalMainPageTaskHandler } from './task/mainPage';

class FanaticalMainController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new FanaticalMainPageTaskHandler(this.componentConfig, this.dataModel));
  }
}

const componentConfig = Container.get(FanaticalMainConfig);
const controller = new FanaticalMainController(componentConfig);
