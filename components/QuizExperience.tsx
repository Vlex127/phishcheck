"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { quiz, scoreQuiz } from "@/lib/quiz";
import {
  AlertTriangleIcon,
  ArrowPathIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  ShieldAlertIcon,
  ShieldCheckIcon,
  XCircleIcon,
} from "@/components/icons";

function answerLabel(value: boolean | undefined) {
  if (value === true) return "Phishing";
  if (value === false) return "Safe";
  return "Not answered";
}

function resultMessage(level: string) {
  if (level === "High awareness") {
    return "You caught most of the warning signs. Keep checking the sender and the full domain before you tap.";
  }

  if (level === "Moderate awareness") {
    return "You caught some signs, but a few scams got through. Review the explanations below and watch for pressure, links, and requests for codes.";
  }

  return "Several scams got through. Slow down and check the sender, the full domain, and any request for money or codes before you act.";
}

function levelTone(level: string) {
  if (level === "High awareness") {
    return "border-safe/50 bg-safe/10 text-safe";
  }

  if (level === "Moderate awareness") {
    return "border-caution/50 bg-caution/10 text-caution";
  }

  return "border-danger/50 bg-danger/10 text-danger";
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

export function QuizExperience() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const [finished, setFinished] = useState(false);

  const questionHeadingRef = useRef<HTMLHeadingElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const resultHeadingRef = useRef<HTMLHeadingElement>(null);

  const currentQuestion = quiz[currentIndex];
  const isAnswered = currentQuestion
    ? currentQuestion.id in answers
    : false;
  const selectedAnswer = currentQuestion
    ? answers[currentQuestion.id]
    : undefined;
  const isCorrect = currentQuestion
    ? selectedAnswer === currentQuestion.isPhishing
    : false;
  const result = finished ? scoreQuiz(answers) : null;
  const isLastQuestion = currentIndex === quiz.length - 1;

  useEffect(() => {
    if (!finished && isAnswered) {
      nextButtonRef.current?.focus();
    }
  }, [finished, isAnswered, currentIndex]);

  useEffect(() => {
    if (finished) {
      resultHeadingRef.current?.focus();
    }
  }, [finished]);

  function handleAnswer(value: boolean) {
    if (!currentQuestion || isAnswered) return;

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: value,
    }));
  }

  function handleNext() {
    if (isLastQuestion) {
      setFinished(true);
      return;
    }

    setCurrentIndex((index) => index + 1);
    window.requestAnimationFrame(() => questionHeadingRef.current?.focus());
  }

  function handleRestart() {
    setAnswers({});
    setCurrentIndex(0);
    setFinished(false);
    window.requestAnimationFrame(() => questionHeadingRef.current?.focus());
  }

  function choiceClass(value: boolean) {
    if (!isAnswered) {
      return "border-line bg-canvas text-ink enabled:hover:border-ink enabled:hover:bg-accent-soft/50";
    }

    if (currentQuestion && value === currentQuestion.isPhishing) {
      return "border-safe bg-safe/10 text-ink";
    }

    if (value === selectedAnswer) {
      return "border-danger bg-danger/10 text-ink";
    }

    return "border-line bg-canvas/60 text-muted";
  }

  if (finished && result) {
    return (
      <section aria-labelledby="results-heading">
        <div className="border border-line bg-surface">
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-6">
            <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-accent">
              Assessment / complete
            </p>
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
              {result.total} / {result.total} answered
            </p>
          </div>

          <div className="p-4 sm:p-6">
            <div className="grid gap-5 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
                <h2
                  id="results-heading"
                  ref={resultHeadingRef}
                  tabIndex={-1}
                  className="font-display text-4xl font-extrabold leading-none sm:text-5xl"
                >
                  Your result
                </h2>
                <p className="mt-2 text-sm text-muted">
                  {result.correct} of {result.total} questions correct
                </p>
              </div>

              <div className="flex items-end justify-between gap-4 sm:justify-end">
                <p className="font-display text-6xl font-extrabold leading-none tracking-[-0.06em] sm:text-7xl">
                  {result.pct}
                  <span className="ml-0.5 text-2xl text-muted">%</span>
                </p>
                <span
                  className={`mb-1 inline-block border px-2.5 py-1.5 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] ${levelTone(
                    result.level,
                  )}`}
                >
                  {result.level}
                </span>
              </div>
            </div>

            <div className="mt-6 border-l-2 border-accent pl-4">
              <p className="text-sm leading-6">{resultMessage(result.level)}</p>
              <p className="mt-2 text-xs leading-5 text-muted">
                This level is based only on this short quiz. Review the answers
                below to see which warning signs you missed.
              </p>
            </div>

            <div className="mt-6 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={handleRestart}
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-ink bg-ink px-5 text-sm font-semibold text-canvas transition-colors hover:border-accent hover:bg-accent"
              >
                <ArrowPathIcon className="size-4" />
                Try again
              </button>
              <Link
                href="/checker"
                className="inline-flex min-h-12 items-center justify-center gap-2 border border-line bg-transparent px-5 text-sm font-semibold text-ink transition-colors hover:border-ink"
              >
                Check a link
                <ArrowRightIcon className="size-4" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 border border-line bg-surface">
          <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-6">
            <h3 className="font-display text-lg font-bold tracking-[-0.03em]">
              Review your answers
            </h3>
            <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-muted">
              {result.total} items
            </p>
          </div>

          <ol className="divide-y divide-line">
            {quiz.map((item, index) => {
              const userAnswer = answers[item.id];
              const wasCorrect = userAnswer === item.isPhishing;

              return (
                <li key={item.id} className="p-4 sm:p-6">
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-accent">
                      Question {pad(index + 1)} / {item.channel}
                    </p>
                    <span
                      className={`inline-flex shrink-0 items-center gap-1.5 border px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.1em] ${
                        wasCorrect
                          ? "border-safe/50 bg-safe/10 text-safe"
                          : "border-danger/50 bg-danger/10 text-danger"
                      }`}
                    >
                      {wasCorrect ? (
                        <CheckCircleIcon className="size-3.5" />
                      ) : (
                        <XCircleIcon className="size-3.5" />
                      )}
                      {wasCorrect ? "Correct" : "Incorrect"}
                    </span>
                  </div>

                  <p className="mt-3 whitespace-pre-line break-words border-l-2 border-line pl-3 text-sm leading-6">
                    {item.message}
                  </p>

                  <dl className="mt-3 grid grid-cols-2 gap-4 border-t border-line pt-3 sm:max-w-sm">
                    <div>
                      <dt className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">
                        Your answer
                      </dt>
                      <dd className="mt-1 text-sm font-semibold">
                        {answerLabel(userAnswer)}
                      </dd>
                    </div>
                    <div>
                      <dt className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">
                        Correct answer
                      </dt>
                      <dd className="mt-1 text-sm font-semibold">
                        {item.isPhishing ? "Phishing" : "Safe"}
                      </dd>
                    </div>
                  </dl>

                  <p className="mt-3 text-sm leading-6 text-muted">
                    <span className="font-semibold text-ink">Why: </span>
                    {item.explanation}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>
    );
  }

  if (!currentQuestion) return null;

  return (
    <div className="border border-line bg-surface shadow-offset-sm">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-6">
        <p className="font-mono text-[9px] font-semibold uppercase tracking-[0.16em] text-accent">
          Question {pad(currentIndex + 1)} / {pad(quiz.length)}
        </p>
        <span className="border border-line px-2 py-1 font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-muted">
          {currentQuestion.channel}
        </span>
      </div>

      <div
        role="progressbar"
        aria-label="Quiz progress"
        aria-valuemin={0}
        aria-valuemax={quiz.length}
        aria-valuenow={currentIndex + 1}
        aria-valuetext={`Question ${currentIndex + 1} of ${quiz.length}`}
        className="flex gap-1 border-b border-line px-4 py-2.5 sm:px-6"
      >
        {quiz.map((item, index) => (
          <span
            key={item.id}
            aria-hidden="true"
            className={`h-1 flex-1 transition-colors ${
              index <= currentIndex ? "bg-accent" : "bg-line"
            }`}
          />
        ))}
      </div>

      <div className="p-4 sm:p-6">
        <h2
          id="question-heading"
          ref={questionHeadingRef}
          tabIndex={-1}
          className="text-balance font-display text-2xl font-bold leading-tight sm:text-3xl"
        >
          Is this message phishing or safe?
        </h2>

        <div className="mt-4 border-l-2 border-accent bg-canvas p-4 sm:p-5">
          <p className="whitespace-pre-line break-words text-base leading-7 sm:text-[1.05rem] sm:leading-8">
            {currentQuestion.message}
          </p>
        </div>

        <div
          role="group"
          aria-labelledby="question-heading"
          className="mt-5 grid grid-cols-2 gap-3"
        >
          {[true, false].map((choice) => (
            <button
              key={String(choice)}
              type="button"
              onClick={() => handleAnswer(choice)}
              disabled={isAnswered}
              className={`relative flex min-h-[5.5rem] flex-col items-center justify-center border-2 px-3 py-3 text-base font-semibold transition-colors disabled:cursor-default disabled:pointer-events-none ${choiceClass(
                choice,
              )}`}
            >
              {isAnswered && choice === currentQuestion.isPhishing ? (
                <CheckCircleIcon className="absolute right-2 top-2 size-4 text-safe" />
              ) : null}
              {isAnswered &&
              choice !== currentQuestion.isPhishing &&
              choice === selectedAnswer ? (
                <XCircleIcon className="absolute right-2 top-2 size-4 text-danger" />
              ) : null}

              <span className="flex items-center gap-2">
                {choice ? (
                  <ShieldAlertIcon className="size-5" />
                ) : (
                  <ShieldCheckIcon className="size-5" />
                )}
                {choice ? "Phishing" : "Safe"}
              </span>
              <span className="mt-1 h-4 font-mono text-[8px] font-semibold uppercase tracking-[0.12em] text-muted">
                {choice === selectedAnswer ? "Your answer" : ""}
              </span>
            </button>
          ))}
        </div>

        <div aria-live="polite" aria-atomic="true">
          {isAnswered && (
            <div
              className={`mt-5 border-l-2 pl-4 ${
                isCorrect ? "border-safe" : "border-danger"
              }`}
            >
              <p
                className={`flex items-center gap-2 font-mono text-[9px] font-semibold uppercase tracking-[0.14em] ${
                  isCorrect ? "text-safe" : "text-danger"
                }`}
              >
                {isCorrect ? (
                  <CheckCircleIcon className="size-4" />
                ) : (
                  <AlertTriangleIcon className="size-4" />
                )}
                {isCorrect ? "Verdict / correct" : "Verdict / missed"}
              </p>
              <p className="mt-1 font-display text-2xl font-bold leading-tight">
                {isCorrect ? "Well spotted." : "That one was tricky."}
              </p>
              <p className="mt-1 text-sm leading-6 text-muted">
                {currentQuestion.explanation}
              </p>

              <button
                ref={nextButtonRef}
                type="button"
                onClick={handleNext}
                className="mt-4 inline-flex min-h-11 w-full items-center justify-center gap-2 border border-ink bg-ink px-4 text-sm font-semibold text-canvas transition-colors hover:border-accent hover:bg-accent"
              >
                {isLastQuestion ? "See results" : "Next question"}
                <ArrowRightIcon className="size-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
