import { newEnforcer } from 'casbin';
import { MongooseAdapter } from 'casbin-mongoose-adapter';
import serverconfig from './serverconfig';

const initCasbin = async () => {
  // 使用 MongoDB 适配器
  const adapter = await MongooseAdapter.newAdapter(serverconfig.casbinurl);

  // 加载模型和策略
  const enforcer = await newEnforcer('../../casbin_model.conf', adapter);

//   // 如果没有策略，初始化一个示例策略
//   await enforcer.addPolicy('alice', 'data1', 'read');
//   await enforcer.addPolicy('bob', 'data2', 'write');

  return enforcer;
};

export default initCasbin;
