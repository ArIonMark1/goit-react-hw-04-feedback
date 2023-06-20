import React, { useState } from 'react';
import css from './App.module.css';
import Section from './Section';
import FeedbackOptions from './FeedbackOptions';
import Statistics from './Statistics';
import Notification from './Notification';

export default function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const totalFeedback = good + neutral + bad;

  function raitingCounter(evt) {
    const { name } = evt.target;

    switch (name) {
      case 'good':
        setGood(good + 1);
        break;
      case 'neutral':
        setNeutral(neutral + 1);
        break;
      case 'bad':
        setBad(bad + 1);
        break;
      default:
        return;
    }
  }

  function countPositiveFeedbackPercentage() {
    const positivePercent =
      ((good - totalFeedback) / totalFeedback) * 100 + 100;

    if (String(positivePercent).length <= 5) {
      return positivePercent;
    }
    return positivePercent.toFixed(2);
  }

  return (
    <div className={css.app}>
      <div className={css.containerContent}>
        <Section title="Feedback">
          <FeedbackOptions
            options={{ good, neutral, bad }}
            onLeaveFeedback={raitingCounter}
          />
        </Section>
        <Section title="Statistics">
          {!totalFeedback ? (
            <Notification message="There is no feedback." />
          ) : (
            <Statistics
              good={good}
              neutral={neutral}
              bad={bad}
              total={totalFeedback}
              positivePercentage={countPositiveFeedbackPercentage}
            />
          )}
        </Section>
      </div>
    </div>
  );
}
