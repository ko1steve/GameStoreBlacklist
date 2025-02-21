import './style.css';
import { Container } from 'typescript-ioc';
import { ComponentController } from './../../../../core/componentController';
import { GreenManGamingSalesConfig } from './config';
import { GreenManGamingSalesTaskHandler } from './task/sales';

class GreenManGamingSalesController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new GreenManGamingSalesTaskHandler(this.componentConfig, this.dataModel));
  }
}

const componentConfig = Container.get(GreenManGamingSalesConfig);
const controller = new GreenManGamingSalesController(componentConfig);
controller.running = true;
