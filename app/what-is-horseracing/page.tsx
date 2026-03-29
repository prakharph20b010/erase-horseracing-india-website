"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function WhatIsHorseracingPage() {
  const [expandedIndex, setExpandedIndex] = useState(0)

  const sections = [
    {
      title: "Exploitation & Enslavement for Entertainment",
      content: `Horseracing is often portrayed as a sport of grace, prestige, and partnership between horse and rider. Beneath this illusion, however, lies a brutal reality of systematic cruelty and exploitation. Racehorses are bred for profit, trained through fear, and discarded once their usefulness ends. From confinement in small stalls and painful whipping to exhaustion under extreme heat, these sentient beings endure suffering at every stage of their lives. What the industry calls “sport” is, in truth, a cycle of pain masked by glamour and gambling.

This report highlights most of the major forms of cruelty in horseracing, though it’s important to note that many others remain unseen or unreported. Cruelty is not an accident in horseracing—it is its foundation. Without it, the industry simply could not exist. And even if, by some miracle, horseracing were made “99% less cruel,” the undeniable truth remains: horses are treated as slaves, denied freedom, autonomy, and dignity. For that reason alone, this exploitation must come to an end.`,
    },
    {
      title: "Whipping",
      image: "/erase-horseracing-india-website/what-is-horseracing/whipping.jpg",
      content: `In a 2020 study published in Animals, Professor McGreevy and colleagues examined whether horses would likely feel as much pain as humans would when whipped. The results revealed “no significant difference” between humans and horses in the concentration of nerve endings in the outer layers of skin, nor any difference in the thickness of this skin layer. “This was not surprising, as horses, like humans, need robust yet sensitive skin to respond to touch, say, from flying insects or other horses,” said Professor McGreevy.

Whips don’t make horses run faster.
Whips don’t improve safety.
Whips only cause fear and pain. It is not an encouragement. It is a threat to hurt them more and instil fear. Whipping is a public display of violence, irrespective of whether it is done to a dog, a horse, or a human.`,
    },
    {
      title: "Mouth bits",
      image: "/erase-horseracing-india-website/what-is-horseracing/mouth-bits.jpg",
      content: `The things they force into racehorses’ mouths — mouth bits, tongue ties, lip chains — and the numerous reports of “sore oral commissures” in racing incident logs cannot be ignored. The bit, often defended as a “tool of communication,” is in reality a cruel instrument of control. Its pressure on the horse’s richly innervated mouth tissues induces acute and immediate pain, often so intense it can override all other sensations — even fear. A 2020 study by David J. Mellor in Animals explained how horses show a strong aversion to bits, which can cause intense breathlessness, panic, and anxiety. The bit’s placement also interferes with a horse’s ability to breathe freely, producing sensations of suffocation that drive fear and distress.

Far from the illusion of a “cooperative” racehorse prancing eagerly at the gate, the behaviours we see — wide eyes, gaping mouths, teeth grinding, salivation, tongue lolling, head shaking, and tail swishing — are not signs of excitement but of agony. These are horses desperately reacting to pain they cannot escape. When the industry calls this “communication,” it conceals a harsh reality: horses are not willing participants but terrified, helpless victims forced to obey through pain.`,
    },
    {
      title: "Concrete Stalls and Psychological Stress",
      youtubeId: "BjqsDhaw_4E",
      content: `A standard practice in the horseracing industry is to confine horses in concrete stalls for 21-23 hours a day, every single day. This can cause horses to suffer from abdominal pain, respiratory problems, obsessive pacing, cribbing, head shaking, weaving, digging, kicking, and self-mutilation. Horses are social animals. If allowed, they will spend > 60% of their day foraging and the remaining time grooming, playing, and resting with each other. Legally in India, race horses can be “housed in stables admeasuring 12ft X 12ft”, and that is mentioned as adequate. But, is it? Those who put their horses in these stables should ask themselves if they would confine their 5-year-old child in a room barely large enough for them to turn around — for 23 hours a day? If not, then why horses?`,
    },
    {
      title: "Starting gates",
      youtubeId: "KbvMzKXh_5w",
      content: `Injuries at the starting gates are all too common. Horses are hardwired to avoid tight, enclosed spaces where they can’t see escape routes. A starting gate is narrow, metallic, loud, and confining; everything that triggers a horse’s flight instinct. The clanging of the metal gates, shouting handlers, loudspeakers, and the presence of other stressed horses all increase anxiety. When the gates open suddenly with a loud bang, many horses panic, rear, or leap sideways.

Horses that hesitate to enter are often pushed, tugged, or hit to enter the stall. Some are even fitted with blinkers or hoods to reduce resistance, and it is not to calm them, but to confuse or desensitize them. When horses are described as 'fractious' or 'reluctant to stall,' they could actually be experiencing psychological stress. Horses are prey animals. They run when they sense danger, not for fun or competition. Clearly, horses don’t choose to race. They’re confined, coerced, and terrorised to do so.`,
    },
    {
      title: "Back pain",
      image: "/erase-horseracing-india-website/what-is-horseracing/back-pain.jpg",
      content: `Horses reach their adult size at 2 years old, and they are ridden with 50-60 kg on their back during training and racing. However, their backbone is not mature until 5 years old. “Back pain is one of the most common syndromes in ridden horses,” and “90% of flat racehorses exhibit clinical signs of back pain” – Domańska-Kruppa et al. in Journal Animals in 2024. In simple words, horses aren't meant to be ridden or raced.`,
    },
    {
      title: "Exercise-induced pulmonary hemorrhage",
      image: "/erase-horseracing-india-website/what-is-horseracing/eiph.jpg",
      content: `Exercise-induced pulmonary hemorrhage (EIPH) is one of the most common injuries in racehorses. It is bleeding in the lungs that occurs during intense physical activity. This bleeding can cause blood to build up in the lung’s support tissues and airways, making it harder to breathe. “EIPH is unavoidable in horses performing maximally and at high speeds.” – Dr. Warwick M. Bayle at the 2021 American Association of Equine Practitioners’ Convention. On July 11, 2025, Sharan Kumar, the Editor in Chief of Racingpulse, a leading horseracing blog, wrote, “On race days, the sight of horses returning with burst blood vessels is all too common, a sign of the intense strain placed on animals that may not be fully fit or sound.” The fact is that bleeding from the lungs is unavoidable in racehorses. If the most basic action in a “sport” causes pain and suffering, how can banning it not be the only just response?`,
    },
    {
      title: "Heat stress",
      youtubeId: "OL1OnBLEPL8",
      content: `Following strenuous exercises like racing or training in hot or hot and humid environments, horses accumulate more body heat than they can dissipate. This can lead to heat stress, a condition in which they are unable to regulate their body temperature within a safe range. Despite this risk, all races are held in the afternoon, when temperatures often soar above 30℃ – tormenting the horses in every race and shamelessly celebrating their “victories” without care.`,
    },
    {
      title: "Colic",
      image: "/erase-horseracing-india-website/what-is-horseracing/colic.jpg",
      content: `Colic is an excruciatingly painful and often fatal condition in horses, caused by severe abdominal pain and intestinal distress...`,
    },
    {
  title: "Retirement",
  image: "/erase-horseracing-india-website/what-is-horseracing/retirement.jpg",
  content: `LIE: Retired racehorses live peacefully on pastures or at sanctuaries.
TRUTH: Retirement is just a word used to sell off the racehorses.

Racehorses are generally “retired” by age 7 or 8 — once they stop turning a profit. Horses with numerous “victories” are sent to stud farms, where they are used to produce “next winning horses.” Others are either abandoned or sold off to riding schools and other places that use them for entertainment. Many are used to pull carriages and give joy rides to tourists. Some are even bled to death for serum.

In May 2025, after 8 horses died in Jabalpur, the Madhya Pradesh state government ordered a probe into how 57 racing horses from Hyderabad had suddenly landed up in Jabalpur. Following a complaint by a Jaipur polo player against HithaNet India Pvt Ltd at the Hyderabad Race Club, regarding the sick condition of the racehorses, they were covertly transported from Hyderabad to Raipura village in Jabalpur, Madhya Pradesh, without the necessary medical and transport clearances. This is an example of the prevalent negligence of the ex-racehorses. They were locked up and starved to death.

They are simply sold off like slaves from one abusive industry to another. There is no escape from exploitation and it is never-ending suffering for the horses.`,
},

{
  title: "Breeding",
  image: "/erase-horseracing-india-website/what-is-horseracing/breeding.jpg",
  content: `Breeding in the horseracing industry involves a series of deeply unnatural and distressing practices for both mares and stallions. Mares, whose reproductive cycles are manipulated with artificial lighting and hormones, are restrained during mating with lip twitches, and breeding hobbles or boots to prevent resistance during mating, leaving them unable to reject the stallion’s advances. Their tails are bandaged or shaved, and attendants often physically guide the stallion’s penis into the mare while holding up one of her legs to immobilize her further. This forced restraint ensures compliance, not consent, turning what should be a natural process into a controlled and invasive procedure.

Stallions, meanwhile, endure a regimented and lonely existence—isolated from other horses and made to mate multiple times a day during the breeding season. They are trained to mount mares on command, their natural courtship behaviors entirely suppressed for speed and efficiency. Even “teaser” ponies are used to test mares’ receptiveness, exposing them to the same stressful conditions.

The industry says the Thoroughbred horses are meant to race, since they are selectively bred with traits that make them “the next best winning horse” for centuries. Because the perfect racehorse has to be both fast and light, breeding has selected for Thoroughbreds with huge muscles but light bones. Sally Jenkins, the Washington Post’s sports columnist, called Thoroughbreds "the heart of a locomotive on champagne-glass ankles", and in the 2008 article, she mentioned that while Thoroughbreds have become faster over the years, they have also grown more fragile. “According to several estimates, there are 1.5 career-ending breakdowns for every 1,000 racing starts in the United States. That's an average of two per day,” she added. This remains true after 2 decades. Animal rights organisations in the USA and Australia have been reporting an increasing number of such horse deaths year after year.

The system’s purpose is not the well-being of the horses but the mass production of future racehorses. Every stage—from hormonal manipulation to physical restraint—reflects how the industry treats horses as reproductive tools rather than sentient beings capable of fear and pain.`,
},
    {
      title: "Limb injury, fractures, and euthanasia",
      youtubeId: "https://www.youtube.com/shorts/g_V2cRlchT8",
      content: `For over 300 years, the racehorses have been selectively bred to have lighter bones that make them run faster, and when horses run at breakneck speeds, their limbs experience high repetitive stress, which results in injuries. The most common limb injuries are on the lower limbs – fetlock, cannon, and/or pastern, and surviving limb injuries means living the rest of their lives in lameness. 
      
Horses who succumb to fractures are generally euthanized, and this euthanasia is not at all peaceful, as that done on companion animals. Horses experience immense pain due to the broken bones, and they bleed, fear, and agonize as they breathe their last. Nobody to comfort and no goodbyes. Just death. `,
    },
    {
      title: "Sudden death",
      image: "/erase-horseracing-india-website/what-is-horseracing/sudden-death.jpg",
      content: `In horseracing, horses as young as 3 years old collapse and die on the track, during training, or in the stalls. 
In 2024, 
MAYFLOWER, a 7 year old horse, collapsed and died on the Chennai racetrack. 
JORDANO, a 3 year old horse, tried to escape, sustained multiple injuries, and died due to shock just before his first race at the Bangalore racecourse. 
In 2025, 
SMASH SHOT, a 5 year old horse, collapsed and died during the morning track work at the Kolkata racecourse. 
DEUS EX MACHINA, a 7 year old horse, suffered a cardiac arrest during the race and died on the track in Mysore. 
In July, an unknown racehorse collapsed and died during training at the Bangalore racecourse. 
A few days later, DOMINA, a 7 year old horse, collapsed and died a few meters before the finish line in Bangalore.
And these are what we know so far!
Heart attacks and sudden deaths can be caused by exercise-induced arrhythmias (irregular heartbeats) and heart murmurs (abnormal heart sounds), in which horses often appear completely fine—until they’re not. How would you react if adolescent kids were dying of cardiovascular disease? That’s how serious this is. `,
    },
    {
      title: "Let’s end these tragedies by ending horseracing",
      content: `Don’t watch. Don’t bet. Don’t attend.

Boycott horseracing — for the horses.`,
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main>
        <section className="py-20 md:py-32 px-6 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 border-b relative overflow-hidden">
  <div className="absolute inset-0 opacity-30">
    <div className="absolute top-10 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
    <div className="absolute bottom-0 left-20 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
  </div>
  <div className="container mx-auto max-w-4xl text-center space-y-6 relative z-10">
    <h1 className="font-serif text-5xl md:text-6xl font-bold text-foreground">
      What Is Horseracing?
    </h1>
    <p className="text-xl text-muted-foreground leading-relaxed">
      An educational deep dive into the practices, harms, and realities behind this industry
    </p>
  </div>
</section>
        <section className="py-20 md:py-32 px-6">
          <div className="container mx-auto max-w-4xl space-y-4">
            {sections.map((section, idx) => (
              <div key={idx} className="rounded-xl border border-border/40">
                <button
                  onClick={() => setExpandedIndex(expandedIndex === idx ? -1 : idx)}
                  className="w-full px-6 py-6 text-left flex items-start"
                >
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold">{section.title}</h2>
                  </div>
                  <ChevronDown
                    className={`w-6 h-6 transition-transform ${
                      expandedIndex === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {expandedIndex === idx && (
                  <div className="px-6 pb-6 space-y-6">
                    {section.image && (
                      <img src={section.image} className="w-full rounded-lg" />
                    )}

                    {section.youtubeId && (
                      <iframe
                        className="w-full aspect-video rounded-lg"
                        src={`https://www.youtube.com/embed/${section.youtubeId}`}
                        allowFullScreen
                      />
                    )}

                    <div className="space-y-4">
                      {section.content.split("\n\n").map((p, i) => (
                        <p key={i}>{p}</p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
