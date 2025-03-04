import './style.css';
import { Container } from 'typescript-ioc';
import { ComponentController } from './../../../../core/component-controller';
import { HumbleBundleSearchConfig } from './config';
import { HumbleBundleSearchTaskHandler } from './task/search';

class HumbleBundleSearchController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new HumbleBundleSearchTaskHandler(this.componentConfig, this.dataModel));
  }
}

const componentConfig = Container.get(HumbleBundleSearchConfig);
const controller = new HumbleBundleSearchController(componentConfig);
controller.running = true;
