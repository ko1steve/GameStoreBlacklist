import './style.css';
import { TSMap } from 'typescript-map';
import { Container } from 'typescript-ioc';
import { WebObserverConfig } from '../../../core/web-observer/web-observer-config';
import { WebObserverController } from '../../../core/web-observer/web-observer-controller';
import { HumbleBundleWebObserverConfig } from './config';

Container.bind(WebObserverConfig).to(HumbleBundleWebObserverConfig);
Container.get(WebObserverController);
