import './style.css';
import { Container } from 'typescript-ioc';
import { ComponentController } from './../../../../core/componentController';
import { YuplaySearchConfig } from './config';
import { YuplaySearchTaskHandler } from './task/seatch';

class YuplaySearchController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new YuplaySearchTaskHandler(this.componentConfig, this.dataModel));
  }
}

const componentConfig = Container.get(YuplaySearchConfig);
const controller = new YuplaySearchController(componentConfig);
controller.running = true;
