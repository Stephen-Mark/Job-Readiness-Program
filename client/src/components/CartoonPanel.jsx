// Renders an emoji-based cartoon panel with characters, speech bubbles and a caption.
// cartoon = { bg, characters: [{emoji, position, bubble, thought}], caption }

function SpeechBubble({ text, thought, position }) {
  const isRight = position === 'right';
  return (
    <div className={`absolute ${isRight ? 'right-1' : 'left-1'} -top-12 max-w-28`}>
      <div className={`relative bg-white border-2 border-navy text-navy text-xs font-bold px-2 py-1.5 leading-tight ${thought ? 'rounded-full' : 'rounded-xl'}`}>
        {thought ? `💭 ${text}` : text}
        <div
          className={`absolute top-full ${isRight ? 'right-3' : 'left-3'} w-0 h-0`}
          style={{
            borderLeft: '5px solid transparent',
            borderRight: '5px solid transparent',
            borderTop: '6px solid #1A1753',
          }}
        />
      </div>
    </div>
  );
}

export default function CartoonPanel({ cartoon }) {
  if (!cartoon) return null;
  const { bg = '🏢', setting, characters = [], caption } = cartoon;

  return (
    <div className="rounded-2xl overflow-hidden border-2 border-gray-100 shadow-md mb-4">
      {/* Scene */}
      <div
        className="relative flex items-end justify-around px-6 pt-8 pb-4 min-h-36"
        style={{
          background: cartoon.bgColor || 'linear-gradient(135deg, #E8F5F2 0%, #FFF0D6 100%)',
        }}
      >
        {/* Setting label */}
        {setting && (
          <div className="absolute top-2 left-3 bg-white/80 text-xs font-bold text-mid px-2 py-0.5 rounded-full">
            📍 {setting}
          </div>
        )}

        {/* Characters */}
        {characters.map((char, i) => (
          <div key={i} className="relative flex flex-col items-center gap-1 pb-2">
            {(char.bubble || char.thought) && (
              <SpeechBubble text={char.bubble || char.thought} thought={!!char.thought} position={char.position || (i % 2 === 0 ? 'left' : 'right')} />
            )}
            <span className="text-5xl leading-none select-none">{char.emoji}</span>
            {char.name && (
              <span className="text-xs font-bold text-mid bg-white/70 px-1.5 rounded-full">{char.name}</span>
            )}
          </div>
        ))}
      </div>

      {/* Caption */}
      {caption && (
        <div className="bg-navy px-4 py-2 text-center">
          <p className="text-white text-xs font-semibold italic">"{caption}"</p>
        </div>
      )}
    </div>
  );
}
