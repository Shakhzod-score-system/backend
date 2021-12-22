// Initializes the `collectedPoints` service on path `/collected-points`
import { ServiceAddons } from '@feathersjs/feathers';
import { Application } from '../../declarations';
import { CollectedPoints } from './collected-points.class';
import createModel from '../../models/collected-points.model';
import hooks from './collected-points.hooks';

// Add this service to the service type index
declare module '../../declarations' {
  interface ServiceTypes {
    'collected-points': CollectedPoints & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/collected-points', new CollectedPoints(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('collected-points');

  service.hooks(hooks);
}
