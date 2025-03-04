import './style.css';
import { Container } from 'typescript-ioc';
import { ComponentController } from './../../../../core/component-controller';
import { GreenManGamingSalesConfig } from './config';
import { GreenManGamingMediumProductBlockTaskHandler } from './task/mediumProductBlock';

class GreenManGamingSalesController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new GreenManGamingMediumProductBlockTaskHandler(this.componentConfig, this.dataModel));
  }
}

const componentConfig = Container.get(GreenManGamingSalesConfig);
const controller = new GreenManGamingSalesController(componentConfig);
controller.running = true;
