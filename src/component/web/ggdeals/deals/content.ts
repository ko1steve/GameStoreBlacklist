import './style.css';
import { Container } from 'typescript-ioc';
import { GgdealDealsConfig } from './config';
import { ComponentController } from './../../../../core/componentController';
import { GgdealsListItemsTaskHandler } from './task/listItems';

class GgdealsDealsController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new GgdealsListItemsTaskHandler(this.componentConfig, this.dataModel));
  }
}

const componentConfig = Container.get(GgdealDealsConfig);
const controller = new GgdealsDealsController(componentConfig);
