import './style.css';
import { Container } from 'typescript-ioc';
import { GgdealSearchConfig } from './config';
import { ComponentController } from './../../../../core/componentController';
import { GgdealsSearchTaskHandler } from './task/search';

class GgdealsSearchController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new GgdealsSearchTaskHandler(this.componentConfig, this.dataModel));
  }
}

const componentConfig = Container.get(GgdealSearchConfig);
const controller = new GgdealsSearchController(componentConfig);
