import './style.css';
import { Container } from 'typescript-ioc';
import { GgdealDealsConfig } from './config';
import { ComponentController } from './../../../../core/component-controller';
import { GgdealsListItemsTaskHandler } from './task/list-items';

class GgdealsDealsController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new GgdealsListItemsTaskHandler(this.componentConfig, this.dataModel));
  }
}

const componentConfig = Container.get(GgdealDealsConfig);
const controller = new GgdealsDealsController(componentConfig);
controller.running = true;
