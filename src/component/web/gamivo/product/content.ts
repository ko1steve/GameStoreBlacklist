import './style.css';
import { Container } from 'typescript-ioc';
import { ComponentController } from './../../../../core/componentController';
import { GamivoProductConfig } from './config';
import { GamivoProductTaskHandler } from './task/product';

class GamivoProductController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new GamivoProductTaskHandler(this.componentConfig, this.dataModel));
  }
}

const componentConfig = Container.get(GamivoProductConfig);
const controller = new GamivoProductController(componentConfig);
controller.running = true;
