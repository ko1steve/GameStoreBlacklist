import './style.css';
import { Container } from 'typescript-ioc';
import { WebObserverController } from '../../../core/web-observer/web-observer-controller';
import { WebObserverConfig } from '../../../core/web-observer/web-observer-config';
import { FanaticalWebObserverConfig } from './config';

Container.bind(WebObserverConfig).to(FanaticalWebObserverConfig);
Container.get(WebObserverController);
