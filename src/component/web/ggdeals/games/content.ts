import './style.css';
import { Container } from 'typescript-ioc';
import { GgdealGamesConfig } from './config';
import { ComponentController } from './../../../../core/componentController';
import { GgdealsListItemsTaskHandler } from './task/listItem';

class GgdealsGamesController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new GgdealsListItemsTaskHandler(this.componentConfig, this.dataModel));
  }
}

const componentConfig = Container.get(GgdealGamesConfig);
const controller = new GgdealsGamesController(componentConfig);
