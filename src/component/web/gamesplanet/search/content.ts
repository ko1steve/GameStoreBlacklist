import './style.css';
import { Container } from 'typescript-ioc';
import { ComponentController } from './../../../../core/componentController';
import { GamesplanetSearchConfig } from './config';
import { GamesplanetSearchTaskHandler } from './task/search';

class GamesplanetSearchController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new GamesplanetSearchTaskHandler(this.componentConfig, this.dataModel));
  }
}

const componentConfig = Container.get(GamesplanetSearchConfig);
const controller = new GamesplanetSearchController(componentConfig);
controller.running = true;
