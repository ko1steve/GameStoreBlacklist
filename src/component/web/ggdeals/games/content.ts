import './style.css';
import { Container } from 'typescript-ioc';
import { GgdealGamesConfig } from './config';
import { ComponentController } from './../../../../core/component-controller';
import { GgdealsListItemsTaskHandler } from './task/list-item';

class GgdealsGamesController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new GgdealsListItemsTaskHandler(this.componentConfig, this.dataModel));
  }
}

const componentConfig = Container.get(GgdealGamesConfig);
const controller = new GgdealsGamesController(componentConfig);
controller.running = true;
