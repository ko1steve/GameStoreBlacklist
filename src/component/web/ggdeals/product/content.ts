import './style.css';
import { Container } from 'typescript-ioc';
import { ComponentController } from './../../../../core/component-controller';
import { GgdealsProductConfig } from './config';
import { GgdealsProductTaskHandler } from './task/product';

class GgdealsProductController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new GgdealsProductTaskHandler(this.componentConfig, this.dataModel));
  }
}

const componentConfig = Container.get(GgdealsProductConfig);
const controller = new GgdealsProductController(componentConfig);
controller.running = true;
