import fs from 'fs';
import path from 'path';

export class BehaviourLog {
  static log(event, output) {
    const dir = path.join(process.cwd(), 'system', 'logs');
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    const entry = {
      ts: new Date().toISOString(),
      event,
      output
    };

    const file = path.join(dir, 'behaviour.log');
    fs.appendFileSync(file, JSON.stringify(entry) + '\n');
  }
}
