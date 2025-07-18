import { useState, useEffect, useCallback } from "react";
import { theme } from "../../../shared/styles/designSystem";

type ConfettiPiece = {
  id: string;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  velocityX: number;
  velocityY: number;
  explosionId: string;
  color: string;
  createdAt: number;
};

type ExplosionPoint = {
  id: string;
  x: number;
  y: number;
  createdAt: number;
};

const CONFETTI_NUMBER = 8;

const createRandomId = (): string => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  return Array.from({ length: 16 }, () =>
    chars.charAt(Math.floor(Math.random() * chars.length)),
  ).join("");
};

// 컨패티 색상 리스트를 만들기 위한 타입가드
const isString = (value: string | Record<number, string>): value is string => {
  return typeof value === "string";
};

const colors = Object.entries(theme.colors)
  .filter(([key]) => key !== "lime" && key !== "black")
  .map(([, value]) => value)
  .filter(isString);

export const Confetti = () => {
  const [, setExplosionPoint] = useState<ExplosionPoint | undefined>();
  const [confetti, setConfetti] = useState<ConfettiPiece[]>([]);

  const generateRandomExplosionPoint = useCallback((): ExplosionPoint => {
    return {
      id: createRandomId(),
      x: Math.random() * 80 + 10,
      y: Math.random() * 30 + 5,
      createdAt: Date.now(),
    };
  }, []);

  const createConfettiFromExplosion = useCallback(
    (explosionPoint: ExplosionPoint): ConfettiPiece[] => {
      return Array.from({ length: CONFETTI_NUMBER + 1 }, (_, i) => {
        const angle = (i * 360) / CONFETTI_NUMBER + Math.random() * 20 - 10;
        const speed = Math.random() * 20 + 10;

        const velocityX = Math.cos((angle * Math.PI) / 180) * speed;
        const velocityY = Math.sin((angle * Math.PI) / 180) * speed;

        const randomColor = colors[Math.floor(Math.random() * colors.length)];

        return {
          id: createRandomId(),
          startX: explosionPoint.x,
          startY: explosionPoint.y,
          currentX: explosionPoint.x,
          currentY: explosionPoint.y,
          velocityX,
          velocityY,
          explosionId: explosionPoint.id,
          createdAt: explosionPoint.createdAt,
          color: randomColor,
        } as const;
      });
    },
    [],
  );

  const createExplosion = useCallback(() => {
    const nextExplosionPoint = generateRandomExplosionPoint();
    console.log(nextExplosionPoint);
    setExplosionPoint(nextExplosionPoint);
    const newConfetti = createConfettiFromExplosion(nextExplosionPoint);
    setConfetti((prev) => [...prev, ...newConfetti]);
  }, [generateRandomExplosionPoint, createConfettiFromExplosion]);

  const updateConfettiPositions = () => {
    setConfetti((prevConfetti) => {
      return prevConfetti
        .map((piece) => {
          const timeElapsed = (Date.now() - piece.createdAt) / 1000; // 초 단위

          const gravity = 40;
          const airResistance = 0.5;
          const bounce = 0.6;
          const friction = 0.98;

          let newVelocityX =
            piece.velocityX * Math.pow(airResistance, timeElapsed);
          let newVelocityY = piece.velocityY + gravity * timeElapsed;

          let newX = piece.startX + newVelocityX * timeElapsed;
          let newY = piece.startY + newVelocityY * timeElapsed;

          // 벽 충돌 처리 (좌우)
          if (newX <= 0) {
            newX = 0;
            newVelocityX = Math.abs(newVelocityX) * bounce; // 오른쪽으로 튕김
          } else if (newX >= 100) {
            newX = 100;
            newVelocityX = -Math.abs(newVelocityX) * bounce; // 왼쪽으로 튕김
          }

          // 바닥 충돌 처리
          if (newY >= 100) {
            newY = 100;
            newVelocityY = -Math.abs(newVelocityY) * bounce;
            newVelocityX *= friction;
          }

          // 천장 충돌 처리
          if (newY <= 0) {
            newY = 0;
            newVelocityY = Math.abs(newVelocityY) * bounce;
          }

          // 속도가 매우 작으면 정지
          if (
            Math.abs(newVelocityX) < 0.1 &&
            Math.abs(newVelocityY) < 0.1 &&
            newY >= 99
          ) {
            newVelocityX = 0;
            newVelocityY = 0;
            newY = 100;
          }

          const updatedPiece = {
            ...piece,
            currentX: newX,
            currentY: newY,
            startX: newX,
            startY: newY,
            velocityX: newVelocityX,
            velocityY: newVelocityY,
            createdAt: Date.now(),
          };

          return updatedPiece;
        })
        .filter((piece) => {
          const timeElapsed = (Date.now() - piece.createdAt) / 1000;
          return timeElapsed < 5;
        });
    });
  };

  useEffect(() => {
    const updateInterval = setInterval(updateConfettiPositions, 30);

    return () => {
      clearInterval(updateInterval);
    };
  }, []);

  useEffect(() => {
    createExplosion();

    const id = setInterval(() => {
      createExplosion();
    }, 3500);

    return () => {
      clearInterval(id);
    };
  }, [createExplosion]);

  return (
    <>
      {confetti.map((piece) => (
        <div
          key={piece.id}
          style={{
            position: "absolute",
            width: "16px",
            height: "16px",
            backgroundColor: `${piece.color}`,
            left: `${piece.currentX}%`,
            top: `${piece.currentY}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      ))}
    </>
  );
};
