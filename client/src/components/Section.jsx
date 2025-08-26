import { motion } from 'framer-motion';

export default function Section({ id, title, children }) {
  return (
    <section id={id} className="relative py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        <motion.h2
          className="text-2xl md:text-3xl font-bold mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {title}
        </motion.h2>
        {children}
      </div>
    </section>
  );
}
