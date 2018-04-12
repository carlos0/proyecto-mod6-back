import chai from 'chai';
import supertest from 'supertest';
import app from '../index';

// import app from '../index';

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;
