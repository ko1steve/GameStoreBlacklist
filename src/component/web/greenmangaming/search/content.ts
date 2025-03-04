import './style.css';
import { Container } from 'typescript-ioc';
import { ComponentController } from './../../../../core/component-controller';
import { GreenManGamingSearchConfig } from './config';
import { GreenManGamingSearchTaskHandler } from './task/search';

class GreenManGamingSearchController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new GreenManGamingSearchTaskHandler(this.componentConfig, this.dataModel));
  }
}

const componentConfig = Container.get(GreenManGamingSearchConfig);
const controller = new GreenManGamingSearchController(componentConfig);
controller.running = true;
