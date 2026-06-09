# 1H Rejection Blocks → 1M Entries (NY) — MNQ / NQ

A TradingView Pine Script (v5) indicator that marks **1-hour Rejection Blocks**
and fires clean **BUY / SELL** signals when price returns to tap them, with a
fixed-R trade plan.

File: [`rejection_blocks_ny.pine`](./rejection_blocks_ny.pine)

## Rejection Block definition used

- **Bullish RB** — a bullish rejection *wick* (long lower wick at a swing low)
  that **traded into a Fair Value Gap**.
- **Bearish RB** — a bearish rejection *wick* (long upper wick at a swing high)
  that **traded into a Fair Value Gap**.

The block zone is drawn from the candle **body edge → wick extreme**, with a
dotted line at the **50%** level.

## Trade logic

| Element   | Rule                                                            |
|-----------|-----------------------------------------------------------------|
| Detection | Rejection Blocks found on the **1H** timeframe                  |
| Entry     | Price returns and **taps** the block (run the indicator on 1M)  |
| Stop-loss | **50% of the block** (the dotted midline)                      |
| Target    | **2R** by default (configurable Risk:Reward)                   |
| Session   | Signals only during the **New York session 09:30–16:00 ET**     |

A block is *armed* only after price leaves it, so signals fire on a genuine
return tap. A block is invalidated if price closes through its far edge.

## How to use

1. Open TradingView, switch to **MNQ** or **NQ** on the **1-minute** chart.
2. Pine Editor → paste `rejection_blocks_ny.pine` → **Add to chart**.
3. (Optional) Create an alert on **RB Buy**, **RB Sell**, or **RB Any**.

## Key settings

- **Rejection Block timeframe** — default `60` (1H).
- **Min wick : body ratio** — how prominent the rejection wick must be.
- **Require Fair Value Gap confluence** — on by default; turn off for raw wick rejections.
- **Risk : Reward target** — default `2.0`.
- **Only signal during New York session** + session / timezone.
- **Visuals** — colors, R/R boxes vs lines, zone display, box length.

## Notes

- Detection is confirmed on **closed** 1H candles, so block zones do not repaint.
- The FVG confluence is an approximation of the verbal definition; tune the wick
  ratio / toggle the FVG filter to match your read of the market.
- Educational tool — not financial advice. Always confirm with your own analysis.
