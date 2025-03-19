import './style.css';
import { Container } from 'typescript-ioc';
import { WebObserverConfig } from '../../../core/web-observer/web-observer-config';
import { WebObserverController } from '../../../core/web-observer/web-observer-controller';
import { YuplayWebObserverConfig } from './config';

Container.bind(WebObserverConfig).to(YuplayWebObserverConfig);
Container.get(WebObserverController);
