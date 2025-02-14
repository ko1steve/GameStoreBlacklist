import './style.css';
import { Container } from 'typescript-ioc';
import { ComponentController } from './../../../../core/componentController';
import { FanaticalSearchConfig } from './config';
import { FanaticalSearchTaskHandler } from './task/search';

class FanaticalSearchController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new FanaticalSearchTaskHandler(this.componentConfig, this.dataModel));
  }
}

const componentConfig = Container.get(FanaticalSearchConfig);
const controller = new FanaticalSearchController(componentConfig);
