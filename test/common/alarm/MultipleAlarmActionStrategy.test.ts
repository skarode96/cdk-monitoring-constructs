import { Stack } from "monocdk";
import { Template } from "monocdk/assertions";
import { Alarm, Metric } from "monocdk/aws-cloudwatch";
import { Topic } from "monocdk/aws-sns";

import { multipleActions, SnsAlarmActionStrategy } from "../../../lib";

test("snapshot test: multiple actions", () => {
  const stack = new Stack();
  const topic1 = new Topic(stack, "DummyTopic1");
  const topic2 = new Topic(stack, "DummyTopic2");
  const topic3 = new Topic(stack, "DummyTopic3");
  const alarm = new Alarm(stack, "DummyAlarm", {
    evaluationPeriods: 1,
    threshold: 0,
    metric: new Metric({ namespace: "Dummy", metricName: "Dummy" }),
  });
  const action = multipleActions(
    new SnsAlarmActionStrategy({ onAlarmTopic: topic1 }),
    new SnsAlarmActionStrategy({ onAlarmTopic: topic2 }),
    new SnsAlarmActionStrategy({ onAlarmTopic: topic3 })
  );
  action.addAlarmActions({ alarm, action });

  expect(Template.fromStack(stack)).toMatchSnapshot();
});
