import './style.css';
import { Container } from 'typescript-ioc';
import { ComponentController } from './../../../../core/componentController';
import { HumbleBundleProductConfig } from './config';
import { HumbleBundleProductTaskHandler } from './task/product';
import { HumbleBundleSlickTrackTaskHandler } from './task/slickTrack';

class HumbleBundleProductController extends ComponentController {
  protected setupTaskQueue (): void {
    this.taskQueue.push(new HumbleBundleProductTaskHandler(this.componentConfig, this.dataModel));
    this.taskQueue.push(new HumbleBundleSlickTrackTaskHandler(this.componentConfig, this.dataModel));
  }
}

const hrefRegex = /^https:\/\/www.humblebundle.com\/store\/(?!search\?).+$/gmi;
if (hrefRegex.test(window.location.href)) {
  const componentConfig = Container.get(HumbleBundleProductConfig);
  const controller = new HumbleBundleProductController(componentConfig);
  controller.running = true;
}
