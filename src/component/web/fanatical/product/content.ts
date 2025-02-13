import './style.css';
import { Container } from 'typescript-ioc';
import { ComponentController } from './../../../../core/componentController';
import { FanaticalProductConfig } from './config';
import { FanaticalProductTaskHandler } from './task/product';

class FanaticalProductController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new FanaticalProductTaskHandler(this.componentConfig, this.dataModel));
  }
}

const componentConfig = Container.get(FanaticalProductConfig);
const controller = new FanaticalProductController(componentConfig);
