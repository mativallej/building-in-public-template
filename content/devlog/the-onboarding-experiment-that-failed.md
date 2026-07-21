---
title: "The onboarding experiment that failed"
description: "We put a $12 paywall in front of signup to filter for serious teams. It filtered out almost everyone. A post-mortem with the numbers."
date: "2026-03-05"
tags: ["growth", "pricing", "experiment"]
author:
  name: "Alex Founder"
  role: "Product & code"
---

We killed an experiment today. Not because it was risky and didn't pay off, but because it was a bad idea that we should have poked harder before shipping. Here's the honest write-up, because we said we'd share the misses too.

## The hypothesis

Since the private beta opened in November, Acme Tasks had been growing on the free path: roughly 200 signups a month, no card, no friction. The problem was that a lot of those teams poked around once and vanished, and the two of us were spending real hours answering setup questions from people who never came back.

So we told ourselves a tidy story. If we charged a one-time $12 for a "guided setup," we'd filter for serious teams and use the money to fund support. Serious teams pay for a coffee's worth of onboarding, right? We convinced each other in about a day. That should have been the first warning.

## What we built

We put a mandatory $12 one-time paywall directly in front of new signups. You couldn't create a workspace without paying for guided setup first. Sam wired up checkout, I wrote the "here's why this costs money" copy, and we shipped it at the start of February. We figured we'd run it for a month and read the numbers.

## What happened

The numbers came in fast, and they were ugly.

|  |  |
| --- | --- |
| ~200/mo | signups before |
| ~60/mo | signups during |
| ~8% | of those who actually paid the $12 |
| ~40% | created a first task within a day |

Signups dropped about 70%, from ~200/mo to ~60/mo. Of the people who did make it to the wall, only about 8% paid. And the teams that paid weren't more engaged, which was the whole bet. Activation, our simplest health check, went the wrong way:

| Metric | Before | After |
| --- | --- | --- |
| Signups per month | ~200 | ~60 |
| Paid the setup fee | n/a | ~8% |
| First task within a day | ~55% | ~40% |

## Why it failed

We asked for money before we'd earned any trust. A brand-new visitor has no idea if Acme Tasks is worth $0, let alone $12, and a paywall on step one reads as "this tool doesn't believe in itself." We also confused "willing to pay" with "serious." Plenty of serious teams simply won't put a card down to evaluate a small tool from a two-person company they've never heard of.

The lessons, plainly:

- Don't charge for the part of the product that proves the product.
- "It filters for serious users" is usually a story you tell to justify friction you already wanted.
- A 70% drop is not a filter. It's a wall.
- Run the cheap version of the test first. We could have surveyed instead of charging.

> If a pricing experiment makes your funnel narrower and your remaining users no more engaged, you didn't find your serious customers. You just found the exit.

## What we changed

As of March 5 we reversed it. Onboarding is free again, no card, no gate. Setup help is just support, which is what it always should have been. We're refunding the handful of people who paid the $12, with an apology.

The thing we actually learned isn't "paywalls are bad." It's that we reached for pricing to solve a trust and activation problem, and pricing can't do that job. The real fix is making the free path good enough that engaged teams show up on their own. That's where we're pointing next: in April we're rolling out a proper free tier and spending our energy on the first-day experience instead of the checkout page.
